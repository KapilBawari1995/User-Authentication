import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    // ============================================
    // TITLE
    // ============================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================================
    // DESCRIPTION
    // ============================================

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // ============================================
    // TYPE
    // task / meeting / event
    // ============================================

    type: {
      type: String,
      enum: ["task", "meeting", "event"],
      default: "task",
    },

    // ============================================
    // TASK REFERENCE
    // ============================================

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },

    // ============================================
    // PROJECT REFERENCE
    // ============================================

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    // ============================================
    // ASSIGNED USER
    // ============================================

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ============================================
    // START DATE
    // ============================================

    startDate: {
      type: Date,
      required: true,
    },

    // ============================================
    // END / DUE DATE
    // ============================================

    endDate: {
      type: Date,
      required: true,
    },

    // ============================================
    // START TIME
    // ============================================

    startTime: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // END TIME
    // ============================================

    endTime: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // STATUS
    // ============================================

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ============================================
    // PRIORITY
    // ============================================

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // ============================================
    // CREATED BY
    // ============================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model(
  "Calendar",
  calendarSchema
);

export default Calendar;