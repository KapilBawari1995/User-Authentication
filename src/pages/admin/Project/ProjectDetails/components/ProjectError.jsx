import React from "react";
import { ArrowLeft } from "lucide-react";

const ProjectError = ({
  error,
  onBack,
}) => {
  return (
    <div>
      <button
        onClick={onBack}
        className="
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-600
          hover:text-indigo-600
          mb-5
        "
      >
        <ArrowLeft size={18} />
        Back to Projects
      </button>

      <div
        className="
          bg-red-50
          border border-red-200
          rounded-2xl
          p-6
        "
      >
        <p className="text-red-600 font-medium">
          {error}
        </p>
      </div>
    </div>
  );
};

export default ProjectError;