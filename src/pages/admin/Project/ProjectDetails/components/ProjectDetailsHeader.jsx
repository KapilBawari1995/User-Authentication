import React from "react";
import { Plus, FolderKanban } from "lucide-react";

import { getStatusStyle } from "../utils/projectDetailsHelpers";

const ProjectDetailsHeader = ({ project, onAddTask }) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-2xl
        shadow-sm dark:shadow-none
        p-6 mb-6
        transition-colors
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

        {/* ================= PROJECT INFO ================= */}

        <div className="flex gap-4">

          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-indigo-50 dark:bg-indigo-500/10
              text-indigo-600 dark:text-indigo-400
              flex items-center justify-center
              shrink-0
            "
          >
            <FolderKanban size={27} />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                {project.name}
              </h1>

              <span
                className={`
                  px-3 py-1
                  rounded-full
                  border
                  text-xs
                  font-semibold
                  ${getStatusStyle(project.status)}
                `}
              >
                {project.status || "Planning"}
              </span>

            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl">
              {project.description ||
                "No project description available."}
            </p>

          </div>

        </div>

        {/* ================= ADD TASK ================= */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={onAddTask}
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              dark:bg-indigo-500
              dark:hover:bg-indigo-600
              text-white
              text-sm
              font-semibold
              shadow-sm
              transition
            "
          >
            <Plus size={18} />
            Add Task
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetailsHeader;