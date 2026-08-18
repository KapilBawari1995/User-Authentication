import Task from "../models/Task.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import createNotification from "../utils/notificationHelper.js";


import Notification from "../models/Notification.js";
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      qaAssignedTo,
      project,
      priority,
      startDate,
      dueDate,
      estimatedHours,
    } = req.body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Developer is required.",
      });
    }

    if (!qaAssignedTo) {
      return res.status(400).json({
        success: false,
        message: "QA / Tester is required.",
      });
    }

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project is required.",
      });
    }

    if (!dueDate) {
      return res.status(400).json({
        success: false,
        message: "Due date is required.",
      });
    }

    // =====================================================
    // LOGGED-IN USER
    // =====================================================

    const loggedUser = await User.findById(req.user.id);

    if (!loggedUser) {
      return res.status(401).json({
        success: false,
        message: "Logged-in user not found.",
      });
    }

    // =====================================================
    // CHECK DEVELOPER
    // =====================================================

    const assignedUser = await User.findById(assignedTo);

    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: "Assigned developer not found.",
      });
    }

    // =====================================================
    // CHECK QA / TESTER
    // =====================================================

    const qaUser = await User.findById(qaAssignedTo);

    if (!qaUser) {
      return res.status(404).json({
        success: false,
        message: "QA / Tester not found.",
      });
    }

    // =====================================================
    // CHECK PROJECT
    // =====================================================

    const projectData = await Project.findById(project);

    if (!projectData) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // =====================================================
    // CREATE TASK
    // =====================================================

    const task = await Task.create({
      title: title.trim(),

      description: description?.trim() || "",

      // Developer
      assignedTo,

      // QA / Tester
      qaAssignedTo,

      // Task creator
      createdBy: req.user.id,

      // Project
      project,

      // Task information
      priority: priority || "Medium",

      status: "Pending",

      startDate: startDate
        ? new Date(startDate)
        : new Date(),

      dueDate,

      estimatedHours: Number(estimatedHours) || 0,

      // Default values
      attachments: [],

      comments: [],

      isActive: true,
    });

    // =====================================================
    // POPULATE TASK
    // =====================================================

    const populatedTask = await Task.findById(task._id)
      .populate(
        "assignedTo",
        "name email"
      )
      .populate(
        "qaAssignedTo",
        "name email"
      )
      .populate(
        "createdBy",
        "name email"
      )
      .populate(
        "project",
        "name"
      );

    // =====================================================
    // NOTIFICATION - DEVELOPER
    // =====================================================

    await createNotification({
      title: "New Task Assigned",

      message: `You have been assigned a new task: ${task.title}`,

      type: "Task",

      receiver: assignedTo,

      sender: req.user.id,

      referenceId: task._id,

      referenceType: "Task",
    });

    // =====================================================
    // NOTIFICATION - QA
    // =====================================================

    await createNotification({
      title: "New QA Task Assigned",

      message: `A new task has been assigned to you for QA testing: ${task.title}`,

      type: "Task",

      receiver: qaAssignedTo,

      sender: req.user.id,

      referenceId: task._id,

      referenceType: "Task",
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message: "Task created successfully.",

      data: populatedTask,
    });

  } catch (error) {
    console.error("Create Task Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const {
      search = "",
      status = "",
      priority = "",
      project = "",
    } = req.query;

    // =====================================================
    // LOGGED IN USER
    // =====================================================

    const user = await User.findById(req.user.id)
      .populate("role", "name");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    const roleName =
      user.role?.name?.toLowerCase();

    // =====================================================
    // BASE QUERY
    // =====================================================

    const query = {};

    // =====================================================
    // SEARCH
    // =====================================================

    if (search.trim()) {
      query.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // =====================================================
    // STATUS
    // =====================================================

    if (status.trim()) {
      query.status = status;
    }

    // =====================================================
    // PRIORITY
    // =====================================================

    if (priority.trim()) {
      query.priority = priority;
    }

    // =====================================================
    // MANAGER
    // =====================================================

    if (roleName === "manager") {
      const managedProjects =
        await Project.find({
          projectManager: user._id,
        }).select("_id");

      const projectIds =
        managedProjects.map(
          (item) => item._id
        );

      console.log(
        "MANAGER PROJECT IDS:",
        projectIds
      );

      if (projectIds.length === 0) {
        return res.status(200).json({
          success: true,
          totalCount: 0,
          data: [],
        });
      }

      // Specific project requested
      if (project.trim()) {
        const isManagedProject =
          projectIds.some(
            (id) =>
              id.toString() ===
              project.toString()
          );

        if (!isManagedProject) {
          return res.status(200).json({
            success: true,
            totalCount: 0,
            data: [],
          });
        }

        query.project = project;
      }

      // All manager projects
      else {
        query.project = {
          $in: projectIds,
        };
      }
    }

    // =====================================================
    // DEVELOPER / QA / OTHER NORMAL USER
    // =====================================================

    else if (
      roleName !== "admin" &&
      roleName !== "super admin" &&
      !user.isSuperAdmin
    ) {
      query.assignedTo = user._id;

      if (project.trim()) {
        query.project = project;
      }
    }

    // =====================================================
    // ADMIN / SUPER ADMIN
    // =====================================================

    else {
      if (project.trim()) {
        query.project = project;
      }
    }

    // =====================================================
    // TOTAL COUNT
    // =====================================================

    const totalCount =
      await Task.countDocuments(query);

    // =====================================================
    // GET TASKS
    // =====================================================

    const tasks = await Task.find(query)
      .populate(
        "assignedTo",
        "name email avatar"
      )

      // ⭐ QA MEMBER
      .populate(
        "qaAssignedTo",
        "name email avatar"
      )

      .populate(
        "createdBy",
        "name email"
      )

      .populate(
        "project",
        "name"
      )

      .sort({
        createdAt: -1,
      })

      .skip(
        (page - 1) * pageSize
      )

      .limit(pageSize);

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      totalCount,
      data: tasks,
    });

  } catch (error) {
    console.error(
      "GET TASKS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("qaAssignedTo", "name email")
      .populate("createdBy", "name");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

await createNotification({
  title: "Task Updated",
  message: `Task "${task.title}" has been updated.`,
  type: "Task",
  receiver: task.assignedTo,
  sender: req.user.id,
  referenceId: task._id,
  referenceType: "Task",
});


    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }


    await createNotification({
  title: "Task Deleted",
  message: `Task "${task.title}" has been deleted.`,
  type: "Task",
  receiver: task.assignedTo,
  sender: req.user.id,
  referenceId: task._id,
  referenceType: "Task",
});

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const changeTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    task.status = status;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      data: task,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};