import React from "react";

const ProjectLoading = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
      <div
        className="
          w-9 h-9
          mx-auto
          border-[3px]
          border-indigo-600
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

      <p className="text-sm text-slate-500 mt-4">
        Loading project details...
      </p>
    </div>
  );
};

export default ProjectLoading;