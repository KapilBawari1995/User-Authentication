import React from "react";
import { Search, RotateCcw } from "lucide-react";

const ProjectFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  const hasFilters =
    search.trim() !== "" ||
    statusFilter !== "All" ||
    priorityFilter !== "All";

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  return (
    <div
      className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-2xl
        p-4
        mb-6
        shadow-sm dark:shadow-none
        transition-colors
      "
    >
      <div className="flex flex-col lg:flex-row gap-4">


        <div className="relative flex-1">
          <Search
            size={19}
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              text-slate-400 dark:text-slate-500
            "
          />

          <input
            type="text"
            placeholder="Search project, manager or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-11 pr-4 py-3
              border border-slate-300 dark:border-slate-700
              rounded-xl
              outline-none
              text-sm
              text-slate-700 dark:text-slate-200
              bg-white dark:bg-slate-800
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition
            "
          />
        </div>

        {/* ================= STATUS ================= */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            px-4 py-3
            border border-slate-300 dark:border-slate-700
            rounded-xl
            bg-white dark:bg-slate-800
            text-sm
            text-slate-700 dark:text-slate-200
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:border-indigo-500
            transition
          "
        >
          <option value="All">All Status</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>


        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="
            px-4 py-3
            border border-slate-300 dark:border-slate-700
            rounded-xl
            bg-white dark:bg-slate-800
            text-sm
            text-slate-700 dark:text-slate-200
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:border-indigo-500
            transition
          "
        >
          <option value="All">All Priority</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>


        {hasFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-4 py-3
              rounded-xl
              border border-slate-200 dark:border-slate-700
              bg-slate-50 dark:bg-slate-800
              text-sm
              font-medium
              text-slate-600 dark:text-slate-300
              hover:bg-slate-100
              dark:hover:bg-slate-700
              hover:text-slate-800
              dark:hover:text-white
              transition
            "
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}

      </div>
    </div>
  );
};

export default ProjectFilters;