import React from "react";
import { FolderKanban } from "lucide-react";

const ProjectEmptyState = () => {
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-2xl
        p-12
        text-center
        shadow-sm dark:shadow-none
        transition-colors
      "
    >
      <FolderKanban
        size={45}
        className="
          mx-auto
          text-slate-300
          dark:text-slate-600
          mb-3
        "
      />

      <h3 className="font-semibold text-slate-700 dark:text-slate-200">
        No projects found
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Try changing your search or filters.
      </p>
    </div>
  );
};

export default ProjectEmptyState;