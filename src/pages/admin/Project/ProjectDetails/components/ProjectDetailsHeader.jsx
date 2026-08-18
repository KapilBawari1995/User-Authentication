import React from "react";
import {
  CalendarDays,
  FolderKanban,
  User,
  Flag,
} from "lucide-react";

import { getStatusStyle } from "../utils/projectDetailsHelpers";

const ProjectDetailsHeader = ({ project}) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-2xl
        shadow-sm
        dark:shadow-none
        p-6 mb-6
        transition-colors
      "
    >
      <div className="flex flex-col gap-6">

        {/* ================= PROJECT INFO ================= */}

        <div className="flex gap-4">

          {/* ICON */}

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

          {/* TITLE + DESCRIPTION */}

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                {project?.name || "Untitled Project"}
              </h1>

              <span
                className={`
                  px-3 py-1
                  rounded-full
                  border
                  text-xs
                  font-semibold
                  ${getStatusStyle(project?.status)}
                `}
              >
                {project?.status || "Planning"}
              </span>

            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-6">
              {project?.description ||
                "No project description available."}
            </p>

          </div>

        </div>

        {/* ================= PROJECT META ================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            pt-5
            border-t
            border-slate-100
            dark:border-slate-800
          "
        >

          {/* PRIORITY */}

          <div className="flex items-center gap-3">

            <div
              className="
                w-9 h-9
                rounded-lg
                bg-amber-50
                dark:bg-amber-500/10
                flex items-center justify-center
              "
            >
              <Flag
                size={17}
                className="text-amber-500"
              />
            </div>

            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Priority
              </p>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                {project?.priority || "Not set"}
              </p>
            </div>

          </div>

          {/* START DATE */}

          <div className="flex items-center gap-3">

            <div
              className="
                w-9 h-9
                rounded-lg
                bg-blue-50
                dark:bg-blue-500/10
                flex items-center justify-center
              "
            >
              <CalendarDays
                size={17}
                className="text-blue-500"
              />
            </div>

            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Start Date
              </p>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                {project?.startDate
                  ? new Date(
                      project.startDate
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not set"}
              </p>
            </div>

          </div>

          {/* END DATE */}

          <div className="flex items-center gap-3">

            <div
              className="
                w-9 h-9
                rounded-lg
                bg-red-50
                dark:bg-red-500/10
                flex items-center justify-center
              "
            >
              <CalendarDays
                size={17}
                className="text-red-500"
              />
            </div>

            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Due Date
              </p>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                {project?.endDate
                  ? new Date(
                      project.endDate
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not set"}
              </p>
            </div>

          </div>

          {/* PROJECT MANAGER */}

          <div className="flex items-center gap-3">

            <div
              className="
                w-9 h-9
                rounded-lg
                bg-emerald-50
                dark:bg-emerald-500/10
                flex items-center justify-center
              "
            >
              <User
                size={17}
                className="text-emerald-500"
              />
            </div>

            <div className="min-w-0">

              <p className="text-xs text-slate-400 dark:text-slate-500">
                Project Manager
              </p>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5 truncate">
                {project?.projectManager?.name ||
                  "Not assigned"}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetailsHeader;