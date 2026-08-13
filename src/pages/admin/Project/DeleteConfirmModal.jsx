import React from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Project?",
  message = "Are you sure you want to delete this project?",
  itemName = "",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm px-4">

      <div
        className="
          w-full max-w-md
          bg-white dark:bg-slate-900
          rounded-2xl
          shadow-2xl
          overflow-hidden
          border border-transparent dark:border-slate-700
          transition-colors
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            flex items-center justify-between
            px-6 py-5
            border-b
            border-slate-200 dark:border-slate-700
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-red-50 dark:bg-red-500/10
                text-red-600 dark:text-red-400
                flex items-center justify-center
              "
            >
              <AlertTriangle size={22} />
            </div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {title}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              w-9 h-9
              rounded-lg
              flex items-center justify-center
              text-slate-400 dark:text-slate-500
              hover:bg-slate-100 dark:hover:bg-slate-800
              hover:text-slate-600 dark:hover:text-slate-300
              transition
              disabled:opacity-50
            "
          >
            <X size={19} />
          </button>

        </div>

        {/* ================= BODY ================= */}

        <div className="px-6 py-5">

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-6">
            {message}
          </p>

          {itemName && (
            <div
              className="
                mt-3
                px-4 py-3
                rounded-xl
                bg-slate-50 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
              "
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selected item
              </p>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1 break-words">
                {itemName}
              </p>
            </div>
          )}

          <div
            className="
              mt-4
              px-4 py-3
              rounded-xl
              bg-red-50 dark:bg-red-500/10
              border border-red-200 dark:border-red-500/30
            "
          >
            <p className="text-xs text-red-600 dark:text-red-400 leading-5">
              This action cannot be undone. All associated data
              will be permanently deleted.
            </p>
          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <div
          className="
            flex items-center justify-end gap-3
            px-6 py-5
            bg-slate-50 dark:bg-slate-800
            border-t
            border-slate-200 dark:border-slate-700
          "
        >

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              px-5 py-2.5
              rounded-xl
              border
              border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-900
              text-slate-700 dark:text-slate-200
              font-semibold
              text-sm
              hover:bg-slate-100 dark:hover:bg-slate-700
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            No, Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              px-5 py-2.5
              rounded-xl
              bg-red-600
              text-white
              font-semibold
              text-sm
              hover:bg-red-700
              transition
              shadow-sm
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteConfirmModal;