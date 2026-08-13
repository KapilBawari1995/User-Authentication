import React from "react";
import {
  Users,
  CalendarDays,
  Wallet,
  User,
} from "lucide-react";

import { formatDate } from "../utils/projectDetailsHelpers";

const ProjectInfo = ({
  project,
  teamMembers = [],
}) => {
  const managerName =
    project?.projectManager?.name ||
    "Not Assigned";

  const managerEmail =
    project?.projectManager?.email || "";

  return (
    <div
      className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-2xl
        shadow-sm dark:shadow-none
        p-6
        mb-6
        transition-colors
      "
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >

        {/* ================= MANAGER ================= */}

        <div className="flex items-start gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-slate-100 dark:bg-slate-800
              text-slate-500 dark:text-slate-400
              flex items-center justify-center
            "
          >
            <User size={18} />
          </div>

          <div>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              Project Manager
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-200
                mt-1
              "
            >
              {managerName}
            </p>

            {managerEmail && (
              <p
                className="
                  text-xs
                  text-slate-400 dark:text-slate-500
                  mt-0.5
                "
              >
                {managerEmail}
              </p>
            )}

          </div>
        </div>

        {/* ================= TEAM ================= */}

        <div className="flex items-start gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-blue-50 dark:bg-blue-500/10
              text-blue-600 dark:text-blue-400
              flex items-center justify-center
            "
          >
            <Users size={18} />
          </div>

          <div>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              Team Members
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-200
                mt-1
              "
            >
              {teamMembers.length} Members
            </p>

          </div>
        </div>

        {/* ================= TIMELINE ================= */}

        <div className="flex items-start gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-amber-50 dark:bg-amber-500/10
              text-amber-600 dark:text-amber-400
              flex items-center justify-center
            "
          >
            <CalendarDays size={18} />
          </div>

          <div>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              Timeline
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-200
                mt-1
              "
            >
              {formatDate(project?.startDate)}
            </p>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              → {formatDate(project?.endDate)}
            </p>

          </div>
        </div>

        {/* ================= BUDGET ================= */}

        <div className="flex items-start gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-emerald-50 dark:bg-emerald-500/10
              text-emerald-600 dark:text-emerald-400
              flex items-center justify-center
            "
          >
            <Wallet size={18} />
          </div>

          <div>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              Budget
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-200
                mt-1
              "
            >
              {project?.budget
                ? `₹ ${project.budget}`
                : "Not Available"}
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectInfo;