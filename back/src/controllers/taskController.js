import Task from "../models/Task.js";
import User from "../models/User.js";
import Project from "../models/Project.js";

import Notification from "../models/Notification.js";
// ================= Create Task =================



// =====================================================
// CREATE TASK
// =====================================================

export const createTask = async (req, res) => {
  try {
    console.log("=================================");
    console.log("CREATE TASK");
    console.log("BODY:", req.body);
    console.log("LOGGED USER:", req.user?.id);
    console.log("=================================");

    // ===================================================
    // GET DATA
    // ===================================================

    const {
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      estimatedHours,
      project,
    } = req.body;

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Assigned user is required.",
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

    // ===================================================
    // CHECK LOGGED-IN USER
    // ===================================================

    const loggedUser = await User.findById(req.user.id);

    if (!loggedUser) {
      return res.status(401).json({
        success: false,
        message: "Logged-in user not found.",
      });
    }

    // ===================================================
    // CHECK ASSIGNED USER
    // ===================================================

    const assignedUser = await User.findById(assignedTo);

    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found.",
      });
    }

    // ===================================================
    // CHECK PROJECT
    // ===================================================

    const projectData = await Project.findById(project);

    if (!projectData) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // ===================================================
    // CREATE TASK
    // ===================================================

    const task = await Task.create({
      title: title.trim(),

      description: description?.trim() || "",

      assignedTo,

      createdBy: req.user.id,

      priority: priority || "Medium",

      status: "Pending",

      startDate: new Date(),

      dueDate,

      estimatedHours: Number(estimatedHours) || 0,

      project,

      attachments: [],

      comments: [],

      isActive: true,
    });

    // ===================================================
    // POPULATE TASK
    // ===================================================

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("project", "name");

    // ===================================================
    // CREATE NOTIFICATION
    // ===================================================

    await Notification.create({
      title: "New Task Assigned",

      message: `You have been assigned a new task: ${task.title}`,

      type: "Task",

      receiver: assignedTo,

      sender: req.user.id,

      referenceId: task._id,

      referenceType: "Task",
    });

    // ===================================================
    // RESPONSE
    // ===================================================

    return res.status(201).json({
      success: true,

      message: "Task created successfully.",

      data: populatedTask,
    });
  } catch (error) {
    console.error("=================================");
    console.error("CREATE TASK ERROR:", error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Tasks =================


export const getTasks = async (req, res) => {
  try {
    // =========================================
    // PAGINATION
    // =========================================

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    // =========================================
    // QUERY PARAMS
    // =========================================

    const {
      search = "",
      status = "",
      priority = "",
      project = "",
    } = req.query;

    // =========================================
    // LOGGED-IN USER
    // =========================================

    const user = await User.findById(req.user.id)
      .populate("role", "name");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    const roleName = user.role?.name?.toLowerCase();

    console.log("=================================");
    console.log("GET TASKS");
    console.log("Logged User ID:", user._id);
    console.log("Logged User Name:", user.name);
    console.log("Logged User Role:", roleName);
    console.log("Project Filter:", project);
    console.log("=================================");

    // =========================================
    // BASE QUERY
    // =========================================

    const query = {};

    // =========================================
    // SEARCH
    // =========================================

    if (search.trim()) {
      query.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // =========================================
    // STATUS
    // =========================================

    if (status.trim()) {
      query.status = status;
    }

    // =========================================
    // PRIORITY
    // =========================================

    if (priority.trim()) {
      query.priority = priority;
    }

    // =========================================
    // MANAGER
    // =========================================
    // Manager ko sirf apne managed projects
    // ke tasks dikhne chahiye.
    // =========================================

    if (roleName === "manager") {
      const managedProjects = await Project.find({
        projectManager: user._id,
      }).select("_id");

      const projectIds = managedProjects.map(
        (item) => item._id
      );

      console.log(
        "MANAGER PROJECT IDS:",
        projectIds
      );

      // -----------------------------------------
      // Agar manager ke paas koi project nahi
      // -----------------------------------------

      if (projectIds.length === 0) {
        return res.status(200).json({
          success: true,
          totalCount: 0,
          data: [],
        });
      }

      // -----------------------------------------
      // Specific project selected
      // -----------------------------------------

      if (project.trim()) {
        const isManagedProject = projectIds.some(
          (id) =>
            id.toString() === project.toString()
        );

        // Manager is project ka manager nahi hai
        if (!isManagedProject) {
          return res.status(200).json({
            success: true,
            totalCount: 0,
            data: [],
          });
        }

        query.project = project;

      } else {

        // -----------------------------------------
        // Manager ke saare managed projects
        // -----------------------------------------

        query.project = {
          $in: projectIds,
        };
      }
    }

    // =========================================
    // NORMAL USER
    // =========================================
    // Normal user ko sirf assigned tasks
    // dikhne chahiye.
    // =========================================

    else if (
      roleName !== "admin" &&
      roleName !== "super admin" &&
      !user.isSuperAdmin
    ) {
      query.assignedTo = user._id;

      // Agar normal user specific project
      // filter kare
      if (project.trim()) {
        query.project = project;
      }
    }

    // =========================================
    // ADMIN / SUPER ADMIN
    // =========================================
    // Admin ko normally saare tasks dikh sakte hain.
    // Agar project filter diya hai to us project
    // ke tasks dikhayenge.
    // =========================================

    else {
      if (project.trim()) {
        query.project = project;
      }
    }

    console.log("FINAL TASK QUERY:", query);

    // =========================================
    // TOTAL COUNT
    // =========================================

    const totalCount = await Task.countDocuments(query);

    // =========================================
    // GET TASKS
    // =========================================

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("project", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // =========================================
    // RESPONSE
    // =========================================

    return res.status(200).json({
      success: true,
      totalCount,
      data: tasks,
    });

  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Task By Id =================

export const getTaskById = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
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


// ================= Update Task =================

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


// ================= Delete Task =================

export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

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


// ================= Change Status =================

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