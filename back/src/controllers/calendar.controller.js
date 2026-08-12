import Task from "../models/Task.js";

// =====================================================
// HELPER
// =====================================================

const getRoleName = (req) => {
  return req.user?.role?.name?.toLowerCase() || "";
};

// =====================================================
// BUILD TASK FILTER
// =====================================================

const buildTaskFilter = (req) => {
  const filter = {};

  const roleName = getRoleName(req);

  // =====================================================
  // DEVELOPER
  // Developer ko sirf assigned tasks dikhayenge
  // =====================================================

  if (roleName === "developer") {
    filter.assignedTo = req.user._id;
  }

  return filter;
};

// =====================================================
// FORMAT TASK AS CALENDAR EVENT
// =====================================================

const formatTaskAsCalendarEvent = (task) => {
  return {
    _id: task._id,

    title: task.title,

    description: task.description || "",

    type: "task",

    // Original task
    task: task._id,

    // Project
    project: task.project || null,

    // Developer
    assignedTo: task.assignedTo || null,

    // Task creator
    createdBy: task.createdBy || null,

    // Calendar date
    startDate: task.dueDate,

    endDate: task.dueDate,

    // Optional time
    startTime: task.startTime || "",

    endTime: task.endTime || "",

    // Task information
    status: task.status || "Pending",

    priority: task.priority || "Medium",

    // Useful frontend flag
    source: "task",
  };
};

// =====================================================
// GET ALL CALENDAR EVENTS
//
// GET /api/v1/calendar
//
// GET /api/v1/calendar?startDate=2026-08-01&endDate=2026-08-31
// =====================================================

export const getCalendarEvents = async (req, res) => {
  try {
    // ===================================================
    // AUTH CHECK
    // ===================================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      startDate,
      endDate,
    } = req.query;

    // ===================================================
    // BASE FILTER
    // ===================================================

    const filter = buildTaskFilter(req);

    // ===================================================
    // DATE FILTER
    //
    // Calendar task ko dueDate ke according show karega
    // ===================================================

    if (startDate || endDate) {
      filter.dueDate = {};

      // Example:
      // 2026-08-01
      if (startDate) {
        const start = new Date(startDate);

        start.setHours(
          0,
          0,
          0,
          0
        );

        filter.dueDate.$gte = start;
      }

      // Example:
      // 2026-08-31
      if (endDate) {
        const end = new Date(endDate);

        end.setHours(
          23,
          59,
          59,
          999
        );

        filter.dueDate.$lte = end;
      }
    }

    // ===================================================
    // FETCH TASKS
    // ===================================================

    const tasks = await Task.find(filter)
      .populate(
        "project",
        "name title description"
      )
      .populate(
        "assignedTo",
        "name email"
      )
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        dueDate: 1,
      });

    // ===================================================
    // TASK → CALENDAR EVENT
    // ===================================================

    const events = tasks.map(
      formatTaskAsCalendarEvent
    );

    // ===================================================
    // RESPONSE
    // ===================================================

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error(
      "GET CALENDAR EVENTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch calendar events",
      error: error.message,
    });
  }
};

// =====================================================
// GET TODAY'S CALENDAR EVENTS
//
// GET /api/v1/calendar/today
//
// Sirf aaj ke due tasks
// =====================================================

export const getTodayCalendarEvents = async (
  req,
  res
) => {
  try {
    // ===================================================
    // AUTH CHECK
    // ===================================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ===================================================
    // TODAY START
    // ===================================================

    const now = new Date();

    const startOfDay = new Date(now);

    startOfDay.setHours(
      0,
      0,
      0,
      0
    );

    // ===================================================
    // TODAY END
    // ===================================================

    const endOfDay = new Date(now);

    endOfDay.setHours(
      23,
      59,
      59,
      999
    );

    // ===================================================
    // FILTER
    // ===================================================

    const filter = buildTaskFilter(req);

    filter.dueDate = {
      $gte: startOfDay,
      $lte: endOfDay,
    };

    // ===================================================
    // FETCH TODAY TASKS
    // ===================================================

    const tasks = await Task.find(filter)
      .populate(
        "project",
        "name title description"
      )
      .populate(
        "assignedTo",
        "name email"
      )
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        dueDate: 1,
      });

    // ===================================================
    // TASK → CALENDAR EVENT
    // ===================================================

    const events = tasks.map(
      formatTaskAsCalendarEvent
    );

    // ===================================================
    // RESPONSE
    // ===================================================

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error(
      "GET TODAY CALENDAR ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch today's schedule",
      error: error.message,
    });
  }
};

// =====================================================
// GET CALENDAR EVENT BY ID
//
// GET /api/v1/calendar/:id
//
// Yahan :id TASK ID hoga
// =====================================================

export const getCalendarById = async (
  req,
  res
) => {
  try {
    // ===================================================
    // AUTH CHECK
    // ===================================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    // ===================================================
    // BASE FILTER
    // ===================================================

    const filter = buildTaskFilter(req);

    filter._id = id;

    // ===================================================
    // FIND TASK
    // ===================================================

    const task = await Task.findOne(filter)
      .populate(
        "project",
        "name title description"
      )
      .populate(
        "assignedTo",
        "name email"
      )
      .populate(
        "createdBy",
        "name email"
      );

    // ===================================================
    // NOT FOUND
    // ===================================================

    if (!task) {
      return res.status(404).json({
        success: false,
        message:
          "Calendar task not found",
      });
    }

    // ===================================================
    // FORMAT
    // ===================================================

    const event =
      formatTaskAsCalendarEvent(task);

    // ===================================================
    // RESPONSE
    // ===================================================

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(
      "GET CALENDAR BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch calendar task",
      error: error.message,
    });
  }
};