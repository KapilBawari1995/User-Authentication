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
        return "bg-red-50 text-red-700 border-red-100";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      case "Low":
        return "bg-green-50 text-green-700 border-green-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className="w-12 h-12 rounded-xl
                bg-gradient-to-br from-indigo-500 to-violet-600
                text-white flex items-center justify-center
                shadow-lg shadow-indigo-100"
              >
                <ClipboardList size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Task Details
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  View complete task information
                </p>
              </div>

            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg
              border border-slate-200
              text-slate-500
              flex items-center justify-center
              hover:bg-red-50
              hover:text-red-600
              hover:border-red-200
              transition"
            >
              <X size={19} />
            </button>

          </div>

        </div>

        {/* Content */}
        <div className="p-6">

          {/* Task Title */}
          <div
            className="bg-slate-50 border border-slate-200
            rounded-2xl p-5 mb-6"
          >

            <div className="flex items-start gap-4">

              <div
                className="w-10 h-10 rounded-xl
                bg-indigo-50 text-indigo-600
                flex items-center justify-center"
              >
                <FileText size={19} />
              </div>

              <div className="flex-1">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Task Title
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-1">
                  {task.title}
                </h3>

              </div>

            </div>

          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Created By */}
            <div className="border border-slate-200 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Created By
                  </p>

                  <p className="font-semibold text-slate-700 mt-1">
                    {task.createdBy?.name || "-"}
                  </p>
                </div>

              </div>

            </div>

            {/* Assigned To */}
            <div className="border border-slate-200 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Assigned To
                  </p>

                  <p className="font-semibold text-slate-700 mt-1">
                    {task.assignedTo?.name || "-"}
                  </p>
                </div>

              </div>

            </div>

            {/* Email */}
            <div className="border border-slate-200 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Mail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Assigned User Email
                  </p>

                  <p className="font-semibold text-slate-700 mt-1 truncate">
                    {task.assignedTo?.email || "-"}
                  </p>
                </div>

              </div>

            </div>

            {/* Due Date */}
            <div className="border border-slate-200 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Calendar size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Due Date
                  </p>

                  <p className="font-semibold text-slate-700 mt-1">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Status / Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            {/* Priority */}
            <div className="border border-slate-200 rounded-xl p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <Flag size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Priority
                    </p>

                    <span
                      className={`inline-flex items-center mt-1 px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityStyle(
                        task.priority
                      )}`}
                    >
                      {task.priority || "-"}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Status */}
            <div className="border border-slate-200 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CircleCheck size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <span
                    className={`inline-flex items-center mt-1 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                      task.status
                    )}`}
                  >
                    {task.status || "-"}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Description */}
          <div className="mt-4 border border-slate-200 rounded-xl p-5">

            <div className="flex items-center gap-2 mb-3">

              <FileText
                size={18}
                className="text-indigo-600"
              />

              <h3 className="font-semibold text-slate-800">
                Description
              </h3>

            </div>

            <p className="text-sm text-slate-500 leading-6">
              {task.description || "No description provided."}
            </p>

          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div className="bg-slate-50 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <Clock3
                  size={18}
                  className="text-indigo-600"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Created At
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {task.createdAt
                      ? new Date(
                          task.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-slate-50 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <Calendar
                  size={18}
                  className="text-indigo-600"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Due Date
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
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

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl
            bg-indigo-600 hover:bg-indigo-700
            text-white font-semibold
            shadow-sm transition"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default ViewTaskModal;