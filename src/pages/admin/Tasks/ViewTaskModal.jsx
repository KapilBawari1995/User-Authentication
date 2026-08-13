import React from "react";
import {
  X,
  ClipboardList,
  User,
  Mail,
  Calendar,
  Clock3,
  Flag,
  CircleCheck,
  FileText,
} from "lucide-react";

const ViewTaskModal = ({ open, task, onClose }) => {
  if (!open || !task) return null;

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return `
          bg-red-50 dark:bg-red-500/10
          text-red-700 dark:text-red-400
          border-red-100 dark:border-red-500/20
        `;

      case "Medium":
        return `
          bg-yellow-50 dark:bg-yellow-500/10
          text-yellow-700 dark:text-yellow-400
          border-yellow-100 dark:border-yellow-500/20
        `;

      case "Low":
        return `
          bg-green-50 dark:bg-green-500/10
          text-green-700 dark:text-green-400
          border-green-100 dark:border-green-500/20
        `;

      default:
        return `
          bg-slate-50 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-100 dark:border-slate-700
        `;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return `
          bg-emerald-50 dark:bg-emerald-500/10
          text-emerald-700 dark:text-emerald-400
          border-emerald-100 dark:border-emerald-500/20
        `;

      case "In Progress":
        return `
          bg-blue-50 dark:bg-blue-500/10
          text-blue-700 dark:text-blue-400
          border-blue-100 dark:border-blue-500/20
        `;

      case "Pending":
        return `
          bg-orange-50 dark:bg-orange-500/10
          text-orange-700 dark:text-orange-400
          border-orange-100 dark:border-orange-500/20
        `;

      default:
        return `
          bg-slate-50 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-100 dark:border-slate-700
        `;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="
          absolute inset-0
          bg-slate-900/50
          dark:bg-black/60
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          bg-white dark:bg-slate-900
          rounded-2xl
          shadow-2xl
          border
          border-slate-200 dark:border-slate-700
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            sticky top-0 z-10
            bg-white dark:bg-slate-900
            border-b
            border-slate-200 dark:border-slate-700
            px-6 py-5
          "
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-gradient-to-br
                  from-indigo-500
                  to-violet-600
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-indigo-100
                  dark:shadow-none
                "
              >
                <ClipboardList size={23} />
              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  Task Details
                </h2>

                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                  View complete task information
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="
                w-9 h-9
                rounded-lg
                border
                border-slate-200 dark:border-slate-700
                text-slate-500 dark:text-slate-400
                flex
                items-center
                justify-center
                hover:bg-red-50 dark:hover:bg-red-500/10
                hover:text-red-600 dark:hover:text-red-400
                hover:border-red-200 dark:hover:border-red-500/30
                transition
              "
            >
              <X size={19} />
            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="p-6">

          {/* Task Title */}
          <div
            className="
              bg-slate-50 dark:bg-slate-800/60
              border
              border-slate-200 dark:border-slate-700
              rounded-2xl
              p-5
              mb-6
            "
          >

            <div className="flex items-start gap-4">

              <div
                className="
                  w-10 h-10
                  rounded-xl
                  bg-indigo-50 dark:bg-indigo-500/10
                  text-indigo-600 dark:text-indigo-400
                  flex
                  items-center
                  justify-center
                "
              >
                <FileText size={19} />
              </div>

              <div className="flex-1">

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400 dark:text-slate-500
                  "
                >
                  Task Title
                </p>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">
                  {task.title}
                </h3>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* INFORMATION GRID */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Created By */}
            <div
              className="
                border
                border-slate-200 dark:border-slate-700
                rounded-xl
                p-4
                bg-white dark:bg-slate-900
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-blue-50 dark:bg-blue-500/10
                    text-blue-600 dark:text-blue-400
                    flex items-center justify-center
                  "
                >
                  <User size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Created By
                  </p>

                  <p className="font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {task.createdBy?.name || "-"}
                  </p>

                </div>

              </div>

            </div>

            {/* Assigned To */}
            <div
              className="
                border
                border-slate-200 dark:border-slate-700
                rounded-xl
                p-4
                bg-white dark:bg-slate-900
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-violet-50 dark:bg-violet-500/10
                    text-violet-600 dark:text-violet-400
                    flex items-center justify-center
                  "
                >
                  <User size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Assigned To
                  </p>

                  <p className="font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {task.assignedTo?.name || "-"}
                  </p>

                </div>

              </div>

            </div>

            {/* Email */}
            <div
              className="
                border
                border-slate-200 dark:border-slate-700
                rounded-xl
                p-4
                bg-white dark:bg-slate-900
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-emerald-50 dark:bg-emerald-500/10
                    text-emerald-600 dark:text-emerald-400
                    flex items-center justify-center
                  "
                >
                  <Mail size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Assigned User Email
                  </p>

                  <p className="font-semibold text-slate-700 dark:text-slate-200 mt-1 truncate">
                    {task.assignedTo?.email || "-"}
                  </p>

                </div>

              </div>

            </div>

            {/* Due Date */}
            <div
              className="
                border
                border-slate-200 dark:border-slate-700
                rounded-xl
                p-4
                bg-white dark:bg-slate-900
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-orange-50 dark:bg-orange-500/10
                    text-orange-600 dark:text-orange-400
                    flex items-center justify-center
                  "
                >
                  <Calendar size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Due Date
                  </p>

                  <p className="font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* STATUS / PRIORITY */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            {/* Priority */}
            <div
              className="
                border
                border-slate-200 dark:border-slate-700
                rounded-xl
                p-4
                bg-white dark:bg-slate-900
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10 h-10
                      rounded-lg
                      bg-red-50 dark:bg-red-500/10
                      text-red-600 dark:text-red-400
                      flex items-center justify-center
                    "
                  >
                    <Flag size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Priority
                    </p>

                    <span
                      className={`
                        inline-flex
                        items-center
                        mt-1
                        px-3 py-1
                        rounded-full
                        border
                        text-xs
                        font-semibold
                        ${getPriorityStyle(task.priority)}
                      `}
                    >
                      {task.priority || "-"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Status */}
            <div
              className="
                border
                border-slate-200 dark:border-slate-700
                rounded-xl
                p-4
                bg-white dark:bg-slate-900
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-emerald-50 dark:bg-emerald-500/10
                    text-emerald-600 dark:text-emerald-400
                    flex items-center justify-center
                  "
                >
                  <CircleCheck size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Status
                  </p>

                  <span
                    className={`
                      inline-flex
                      items-center
                      mt-1
                      px-3 py-1
                      rounded-full
                      border
                      text-xs
                      font-semibold
                      ${getStatusStyle(task.status)}
                    `}
                  >
                    {task.status || "-"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <div
            className="
              mt-4
              border
              border-slate-200 dark:border-slate-700
              rounded-xl
              p-5
              bg-white dark:bg-slate-900
            "
          >

            <div className="flex items-center gap-2 mb-3">

              <FileText
                size={18}
                className="text-indigo-600 dark:text-indigo-400"
              />

              <h3 className="font-semibold text-slate-800 dark:text-white">
                Description
              </h3>

            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-6">
              {task.description || "No description provided."}
            </p>

          </div>

          {/* ================================================= */}
          {/* DATES */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div
              className="
                bg-slate-50 dark:bg-slate-800/60
                border
                border-transparent dark:border-slate-700
                rounded-xl
                p-4
              "
            >

              <div className="flex items-center gap-3">

                <Clock3
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400"
                />

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Created At
                  </p>

                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {task.createdAt
                      ? new Date(
                          task.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

              </div>

            </div>

            <div
              className="
                bg-slate-50 dark:bg-slate-800/60
                border
                border-transparent dark:border-slate-700
                rounded-xl
                p-4
              "
            >

              <div className="flex items-center gap-3">

                <Calendar
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400"
                />

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Due Date
                  </p>

                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div
          className="
            sticky bottom-0
            bg-white dark:bg-slate-900
            border-t
            border-slate-200 dark:border-slate-700
            px-6 py-4
            flex justify-end
          "
        >

          <button
            onClick={onClose}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              shadow-sm
              transition
            "
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default ViewTaskModal;