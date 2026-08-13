import React from "react";

const ProjectError = ({ error }) => {
  return (
    <div
      className="
        bg-red-50 dark:bg-red-500/10
        border border-red-200 dark:border-red-500/30
        rounded-2xl
        p-5
        mb-5
        transition-colors
      "
    >
      <p className="text-red-600 dark:text-red-400 font-medium">
        {error}
      </p>
    </div>
  );
};

export default ProjectError;