import Task from "../models/Task.js";

import Notification from "../models/Notification.js";
// ================= Create Task =================

export const createTask = async (req, res) => {
  try {
        console.log("BODY:", req.body);


    const {
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      estimatedHours,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      estimatedHours,
      createdBy: req.user.id,
    });
await Notification.create({

  title: "New Task Assigned",

  message: `You have been assigned a new task: ${task.title}`,

  type: "Task",

  receiver: assignedTo,

  sender: req.user.id,

  referenceId: task._id,

  referenceType: "Task",

});
    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= Get All Tasks =================

export const getTasks = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || "";

    const query = {
      title: {
        $regex: search,
        $options: "i",
      },
    };

    const totalCount = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      totalCount,
      data: tasks,
    });

  } catch (error) {

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