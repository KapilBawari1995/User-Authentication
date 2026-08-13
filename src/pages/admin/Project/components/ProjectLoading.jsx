import React from "react";

const ProjectLoading = () => {
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
      <div
        className="
          w-8 h-8
          mx-auto
          mb-3
          border-[3px]
          border-indigo-600
          dark:border-indigo-400
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

      <p className="text-slate-500 dark:text-slate-400">
        Loading projects...
      </p>
    </div>
  );
};

export default ProjectLoading;