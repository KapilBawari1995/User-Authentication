import Project from "../models/Project.js";
import User from "../models/User.js";
import Task from "../models/Task.js";


import createNotification from "../utils/notificationHelper.js";
// =====================================================
// CREATE PROJECT
// =====================================================

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      department,
      projectManager,
      startDate,
      endDate,
      priority,
      status,
      budget,
      teamMembers,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required.",
      });
    }

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Department is required.",
      });
    }

    if (!projectManager) {
      return res.status(400).json({
        success: false,
        message: "Project manager is required.",
      });
    }

    if (!startDate) {
      return res.status(400).json({
        success: false,
        message: "Start date is required.",
      });
    }

    if (!endDate) {
      return res.status(400).json({
        success: false,
        message: "End date is required.",
      });
    }

    // ==========================================
    // CREATE PROJECT
    // ==========================================

    const project = await Project.create({
      name: name.trim(),

      description: description?.trim() || "",

      // IMPORTANT
      department,

      projectManager,

      teamMembers: teamMembers || [],

      startDate,

      endDate,

      priority: priority || "Medium",

      status: status || "Planning",

      budget: budget || 0,

      createdBy: req.user._id,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    const populatedProject = await Project.findById(
      project._id
    )
      .populate("department", "name")
      .populate("projectManager", "name email")
      .populate("teamMembers", "name email")
      .populate("createdBy", "name");

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: populatedProject,
    });

  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET PROJECTS
// =====================================================

export const getProjects = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || "";

    const user = await User.findById(req.user.id).populate(
      "role",
      "name scope"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    const roleName = user.role?.name?.toLowerCase();

    const query = {};

    // =================================================
    // SEARCH
    // =================================================

    if (search.trim()) {
      query.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // =================================================
    // ADMIN / SUPER ADMIN
    // =================================================

    if (
      roleName === "admin" ||
      roleName === "super admin" ||
      user.isSuperAdmin
    ) {
      // Global projects
    }

    // =================================================
    // MANAGER
    // =================================================

    else if (roleName === "manager") {
      query.projectManager = user._id;
    }

    // =================================================
    // NORMAL USER
    // =================================================

    else {
      query.teamMembers = user._id;
    }

    console.log("PROJECT QUERY:", query);

    // =================================================
    // COUNT
    // =================================================

    const totalCount = await Project.countDocuments(query);

    // =================================================
    // PROJECTS
    // =================================================

    const projects = await Project.find(query)
      .populate("projectManager", "name email")
      .populate("teamMembers", "name email")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      totalCount,
      data: projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET PROJECT BY ID
// =====================================================

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("projectManager", "name email")
      .populate("teamMembers", "name email")
      .populate("createdBy", "name")
        .populate("department", "name");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("GET PROJECT BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE PROJECT
// =====================================================

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // UPDATE PROJECT
await createNotification({
  title: "Project Updated",
  message: `Project "${project.name}" has been updated.`,
  type: "Project",
  receiver: project.projectManager,
  sender: req.user.id,
  referenceId: project._id,
  referenceType: "Project",
});

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // =====================================================
    // FIND PROJECT
    // =====================================================

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // =====================================================
    // DELETE ALL TASKS OF THIS PROJECT
    // =====================================================

    const deletedTasks = await Task.deleteMany({
      project: projectId,
    });

    console.log(
      `Deleted ${deletedTasks.deletedCount} tasks for project ${projectId}`
    );

    // =====================================================
    // DELETE PROJECT
    // =====================================================

    await Project.findByIdAndDelete(projectId);

    // =====================================================
    // CREATE NOTIFICATION
    // =====================================================

    await createNotification({
      title: "Project Deleted",
      message: `Project "${project.name}" has been deleted.`,
      type: "Project",
      receiver: project.projectManager,
      sender: req.user.id,
      referenceId: project._id,
      referenceType: "Project",
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully.",
      deletedTasks: deletedTasks.deletedCount,
    });

  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addTeamMembers = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { teamMembers } = req.body;

    if (!Array.isArray(teamMembers)) {
      return res.status(400).json({
        success: false,
        message: "teamMembers must be an array",
      });
    }

    if (teamMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one team member",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const users = await User.find({
      _id: { $in: teamMembers },
      isActive: true,
    }).select("_id name email role");

    if (users.length !== teamMembers.length) {
      return res.status(400).json({
        success: false,
        message: "One or more selected users are invalid or inactive",
      });
    }

    const uniqueMembers = [
      ...new Set(
        teamMembers.map((id) => id.toString())
      ),
    ];

    const existingMembers = project.teamMembers.map(
      (id) => id.toString()
    );

    const newMembers = uniqueMembers.filter(
      (id) => !existingMembers.includes(id)
    );

    project.teamMembers.push(...newMembers);

    await project.save();

    const updatedProject = await Project.findById(projectId)
      .populate("projectManager", "name email")
      .populate("teamMembers", "name email role");

    return res.status(200).json({
      success: true,
      message: "Team members added successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("ADD TEAM MEMBERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add team members",
      error: error.message,
    });
  }
};

// =====================================================
// GET PROJECT TEAM MEMBERS
// =====================================================

export const getProjectTeamMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate(
      "teamMembers",
      "name email avatar"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project team members fetched successfully",
      data: project.teamMembers || [],
    });
  } catch (error) {
    console.error(
      "GET PROJECT TEAM MEMBERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch project team members",
    });
  }
};