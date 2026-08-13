import React from "react";
import { FolderKanban, Plus } from "lucide-react";

const ProjectHeader = ({ canCreate, onAdd }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div
          className="
            w-11 h-11 rounded-xl
            bg-indigo-50 dark:bg-indigo-500/10
            text-indigo-600 dark:text-indigo-400
            flex items-center justify-center
          "
        >
          <FolderKanban size={22} />
        </div>

        <div>
          <h1
            className="
              text-2xl font-bold
              text-slate-800 dark:text-white
            "
          >
            Projects
          </h1>

          <p
            className="
              text-sm mt-1
              text-slate-500 dark:text-slate-400
            "
          >
            Manage and track all your projects.
          </p>
        </div>

      </div>

      {/* ADD PROJECT
          Permission same rahega */}
      {canCreate && (
        <button
          type="button"
          onClick={onAdd}
          className="
            flex items-center justify-center gap-2
            bg-indigo-600 hover:bg-indigo-700
            dark:bg-indigo-500 dark:hover:bg-indigo-600
            text-white
            px-5 py-3
            rounded-xl
            font-semibold
            shadow-sm
            transition
          "
        >
          <Plus size={19} />
          Add Project
        </button>
      )}

    </div>
  );
};

export default ProjectHeader;