import React from "react";
import { X } from "lucide-react";

const ViewRoleModal = ({ open, task, onClose }) => {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="
          bg-white dark:bg-slate-900
          rounded-xl shadow-xl
          w-full max-w-2xl
          p-6 relative
          border border-slate-200 dark:border-slate-700
        "
      >

        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            text-slate-500 dark:text-slate-400
            hover:text-slate-800 dark:hover:text-white
            transition
          "
        >
          <X size={22} />
        </button>

        <h2
          className="
            text-2xl font-bold
            mb-6 border-b
            border-slate-200 dark:border-slate-700
            pb-3
            text-slate-800 dark:text-white
          "
        >
          Task Details
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Title
            </p>

            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {task.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Created By
            </p>

            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {task.createdBy?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Assigned To
            </p>

            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {task.assignedTo?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Email To
            </p>

            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {task.assignedTo?.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Priority
            </p>

            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {task.priority}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Status
            </p>

            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {task.status}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Description
            </p>

            <p className="text-slate-700 dark:text-slate-300">
              {task.description}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Due Date
            </p>

            <p className="text-slate-700 dark:text-slate-300">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Created At
            </p>

            <p className="text-slate-700 dark:text-slate-300">
              {task.createdAt
                ? new Date(task.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="
              bg-indigo-600 hover:bg-indigo-700
              text-white
              px-5 py-2 rounded-lg
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

export default ViewRoleModal;