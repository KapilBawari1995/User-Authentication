import Project from "../models/Project.js";
import User from "../models/User.js";

// ================= CREATE PROJECT =================

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      projectManager,
      teamMembers,
      status,
      priority,
      startDate,
      endDate,
      budget,
    } = req.body;

    const project = await Project.create({
      name,
      description,
      projectManager,
      teamMembers,
      status,
      priority,
      startDate,
      endDate,
      budget,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getProjects = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || "";

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
    console.log("GET PROJECTS");
    console.log("Logged User ID:", user._id);
    console.log("Logged User Name:", user.name);
    console.log("Logged User Role:", roleName);
    console.log("=================================");

    // =========================================
    // BASE QUERY
    // =========================================

    const query = {};

    // =========================================
    // SEARCH
    // =========================================

    if (search.trim()) {
      query.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // =========================================
    // ADMIN / SUPER ADMIN
    // =========================================

    if (
      roleName === "admin" ||
      roleName === "super admin" ||
      user.isSuperAdmin
    ) {
      // Admin ko saare projects
    }

    // =========================================
    // MANAGER
    // =========================================

    else if (roleName === "manager") {
      query.projectManager = user._id;
    }

    // =========================================
    // NORMAL USER / DEVELOPER
    // =========================================

    else {
      query.teamMembers = user._id;
    }

    console.log("PROJECT QUERY:", query);

    // =========================================
    // COUNT
    // =========================================

    const totalCount = await Project.countDocuments(query);

    // =========================================
    // GET PROJECTS
    // =========================================

    const projects = await Project.find(query)
      .populate("projectManager", "name email")
      .populate("teamMembers", "name email")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    console.log(
      "PROJECTS RETURNED:",
      projects.map((project) => ({
        id: project._id,
        name: project.name,
        manager: project.projectManager?._id,
        teamMembers: project.teamMembers?.map(
          (member) => member._id
        ),
      }))
    );

    // =========================================
    // RESPONSE
    // =========================================

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
// ================= GET PROJECT BY ID =================

export const getProjectById = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id)
      .populate("projectManager", "name email")
      .populate("teamMembers", "name email")
      .populate("createdBy", "name");

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

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateProject = async (req, res) => {
  try {

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteProject = async (req, res) => {
  try {

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });

  } catch (error) {

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

    // Check project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check users exist
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

    // Remove duplicate IDs
    const uniqueMembers = [
      ...new Set(
        teamMembers.map((id) => id.toString())
      ),
    ];

    // Existing members
    const existingMembers = project.teamMembers.map(
      (id) => id.toString()
    );

    // Add only new members
    const newMembers = uniqueMembers.filter(
      (id) => !existingMembers.includes(id)
    );

    project.teamMembers.push(...newMembers);

    await project.save();

    // Populate response
    const updatedProject = await Project.findById(projectId)
      .populate("projectManager", "name email")
      .populate("teamMembers", "name email role");

    return res.status(200).json({
      success: true,
      message: "Team members added successfully",
      data: updatedProject,
    });

  } catch (error) {
    console.error("Add Team Members Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add team members",
      error: error.message,
    });
  }
};


// ================= GET PROJECT TEAM MEMBERS =================

export const getProjectTeamMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate(
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