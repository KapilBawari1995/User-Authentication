import Project from "../models/Project.js";


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



// ================= GET ALL PROJECTS =================

export const getProjects = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || "";

    const query = {
      name: {
        $regex: search,
        $options: "i",
      },
    };

    const totalCount = await Project.countDocuments(query);

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


// ================= UPDATE PROJECT =================

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


// ================= DELETE PROJECT =================

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