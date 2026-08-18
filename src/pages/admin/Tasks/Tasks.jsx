
import React, { useEffect, useRef, useState } from "react";

import {
  ClipboardList,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  User,
  Plus,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useDebounce from "../../../hooks/useDebounce";
import usePermissions from "../../../hooks/usePermissions";

import {
  getTasksRequest,
  deleteTaskRequest,
} from "../../../features/task/taskSlice";

const Task = ({ projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const debouncedSearch = useDebounce(search, 600);

  const lastRequestRef = useRef("");

  // =====================================================
  // REDUX
  // =====================================================

  const { tasks = [], loading } = useSelector(
    (state) => state.task
  );

  // =====================================================
  // PERMISSIONS
  // =====================================================

  const {
    canView,
    canCreate,
    canEdit,
    canDelete,
  } = usePermissions("Tasks");

  // =====================================================
  // TOTAL TASKS
  // =====================================================

  const totalTasks = tasks.length;

  // =====================================================
  // GET TASKS
  // =====================================================

  useEffect(() => {
    // Project ID nahi hai to API call mat karo
    if (!projectId) {
      return;
    }

    const requestData = {
      search: debouncedSearch || "",
      status:
        statusFilter === "All"
          ? ""
          : statusFilter,
      priority:
        priorityFilter === "All"
          ? ""
          : priorityFilter,
      project: projectId,
    };

    // Same request dobara mat bhejo
    const requestKey = JSON.stringify(requestData);

    if (lastRequestRef.current === requestKey) {
      return;
    }

    lastRequestRef.current = requestKey;

    dispatch(getTasksRequest(requestData));
  }, [
    dispatch,
    projectId,
    debouncedSearch,
    statusFilter,
    priorityFilter,
  ]);

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");

    // Reset ke baad next request allow karo
    lastRequestRef.current = "";
  };

  // =====================================================
  // VIEW TASK
  // =====================================================

  const handleViewTask = (taskId) => {
    navigate(`/admin/projects/tasks/${taskId}`);
  };

  // =====================================================
  // ADD TASK
  // =====================================================

  const handleAddTask = () => {
    navigate(`/admin/projects/${projectId}/tasks/create`);
  };

  // =====================================================
  // EDIT TASK
  // =====================================================

  const handleEditTask = (taskId) => {
    navigate(`/admin/tasks/edit/${taskId}`);
  };

  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTaskRequest(taskId));
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return `
          bg-emerald-50 dark:bg-emerald-500/10
          text-emerald-700 dark:text-emerald-400
          border-emerald-100 dark:border-emerald-500/20
        `;

      case "In Progress":
        return `
          bg-yellow-50 dark:bg-yellow-500/10
          text-yellow-700 dark:text-yellow-400
          border-yellow-100 dark:border-yellow-500/20
        `;

      case "Pending":
        return `
          bg-red-50 dark:bg-red-500/10
          text-red-700 dark:text-red-400
          border-red-100 dark:border-red-500/20
        `;

      default:
        return `
          bg-slate-50 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-200 dark:border-slate-700
        `;
    }
  };

  // =====================================================
  // PRIORITY STYLE
  // =====================================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return `
          bg-red-50 dark:bg-red-500/10
          text-red-600 dark:text-red-400
          border-red-100 dark:border-red-500/20
        `;

      case "Medium":
        return `
          bg-yellow-50 dark:bg-yellow-500/10
          text-yellow-600 dark:text-yellow-400
          border-yellow-100 dark:border-yellow-500/20
        `;

      case "Low":
        return `
          bg-emerald-50 dark:bg-emerald-500/10
          text-emerald-600 dark:text-emerald-400
          border-emerald-100 dark:border-emerald-500/20
        `;

      default:
        return `
          bg-slate-50 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-200 dark:border-slate-700
        `;
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div>
      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <div
        className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          rounded-2xl
          p-4
          mb-6
          shadow-sm
          dark:shadow-none
        "
      >
        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">
            <Search
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                dark:text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-12
                pl-11
                pr-4
                border
                border-slate-200
                dark:border-slate-700
                rounded-xl
                bg-slate-50
                dark:bg-slate-800
                text-slate-700
                dark:text-slate-200
                placeholder:text-slate-400
                outline-none
                focus:bg-white
                dark:focus:bg-slate-900
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-500/10
                transition
              "
            />
          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              h-12
              min-w-[180px]
              px-4
              border
              border-slate-200
              dark:border-slate-700
              rounded-xl
              bg-slate-50
              dark:bg-slate-800
              text-sm
              text-slate-700
              dark:text-slate-200
              outline-none
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-500/10
            "
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* PRIORITY */}

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="
              h-12
              min-w-[180px]
              px-4
              border
              border-slate-200
              dark:border-slate-700
              rounded-xl
              bg-slate-50
              dark:bg-slate-800
              text-sm
              text-slate-700
              dark:text-slate-200
              outline-none
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-500/10
            "
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* RESET */}

          <button
            type="button"
            onClick={handleResetFilters}
            className="
              h-12
              px-5
              rounded-xl
              bg-slate-100
              dark:bg-slate-800
              hover:bg-slate-200
              dark:hover:bg-slate-700
              text-slate-700
              dark:text-slate-300
              text-sm
              font-medium
              transition
            "
          >
            Reset
          </button>
        </div>
      </div>

      {/* ================================================= */}
      {/* TASK TABLE */}
      {/* ================================================= */}

      <div
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200
          dark:border-slate-700
          shadow-sm
          dark:shadow-none
          overflow-hidden
        "
      >
        {/* ================================================= */}
        {/* TABLE HEADER */}
        {/* ================================================= */}

        <div
          className="
            px-6
            py-5
            border-b
            border-slate-200
            dark:border-slate-700
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >
          <div>
            <h2 className="font-bold text-lg text-slate-800 dark:text-white">
              All Tasks
            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {totalTasks} tasks available
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="
                hidden
                md:flex
                items-center
                gap-2
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              <CheckCircle2 size={15} />
              <span>Task management</span>
            </div>

            {/* ADD TASK */}

            {canCreate && (
              <button
                type="button"
                onClick={handleAddTask}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  h-10
                  px-4
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  dark:bg-indigo-500
                  dark:hover:bg-indigo-600
                  text-white
                  text-sm
                  font-semibold
                  shadow-sm
                  hover:shadow-md
                  transition-all
                  duration-200
                "
              >
                <Plus size={17} />
                <span>Add Task</span>
              </button>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">
          <table className="w-full">

            {/* TABLE HEAD */}

            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70">

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  #
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Task
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Developer
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  QA
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Priority
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Due Date
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody
              className="
                divide-y
                divide-slate-100
                dark:divide-slate-800
              "
            >

              {/* LOADING */}

              {loading ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center">

                    <div
                      className="
                        w-8
                        h-8
                        mx-auto
                        border-[3px]
                        border-indigo-600
                        dark:border-indigo-400
                        border-t-transparent
                        rounded-full
                        animate-spin
                      "
                    />

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                      Loading tasks...
                    </p>

                  </td>
                </tr>
              ) : tasks.length > 0 ? (

                tasks.map((item, index) => (
                  <tr
                    key={item._id}
                    className="
                      group
                      hover:bg-slate-50/80
                      dark:hover:bg-slate-800/60
                      transition-colors
                    "
                  >

                    {/* NUMBER */}

                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-400 dark:text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </td>

                    {/* TASK */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-11
                            h-11
                            rounded-xl
                            bg-gradient-to-br
                            from-indigo-50
                            to-violet-50
                            dark:from-indigo-500/10
                            dark:to-violet-500/10
                            text-indigo-600
                            dark:text-indigo-400
                            flex
                            items-center
                            justify-center
                            border
                            border-indigo-100
                            dark:border-indigo-500/20
                            shrink-0
                          "
                        >
                          <ClipboardList size={20} />
                        </div>

                        <div className="max-w-xs">

                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            {item.title}
                          </p>

                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">
                            {item.description || "No description"}
                          </p>

                        </div>

                      </div>
                    </td>

                    {/* DEVELOPER */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-slate-100
                            dark:bg-slate-800
                            text-slate-500
                            dark:text-slate-400
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <User size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {item.assignedTo?.name || "-"}
                          </p>

                          {item.assignedTo?.email && (
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              {item.assignedTo.email}
                            </p>
                          )}
                        </div>

                      </div>
                    </td>

                    {/* QA */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-slate-100
                            dark:bg-slate-800
                            text-slate-500
                            dark:text-slate-400
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <User size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {item.qaAssignedTo?.name || "-"}
                          </p>

                          {item.qaAssignedTo?.email && (
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              {item.qaAssignedTo.email}
                            </p>
                          )}
                        </div>

                      </div>
                    </td>

                    {/* PRIORITY */}

                    <td className="px-6 py-5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1.5
                          rounded-full
                          border
                          text-xs
                          font-semibold
                          ${getPriorityStyle(item.priority)}
                        `}
                      >
                        {item.priority || "-"}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1.5
                          rounded-full
                          border
                          text-xs
                          font-semibold
                          ${getStatusStyle(item.status)}
                        `}
                      >
                        {item.status || "-"}
                      </span>
                    </td>

                    {/* DUE DATE */}

                    <td className="px-6 py-5">
                      <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatDate(item.dueDate)}
                      </p>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">

                        {/* VIEW */}

                        {canView && (
                          <button
                            type="button"
                            title="View Task"
                            onClick={() =>
                              handleViewTask(item._id)
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              border
                              border-slate-200
                              dark:border-slate-700
                              bg-white
                              dark:bg-slate-800
                              text-slate-500
                              dark:text-slate-400
                              flex
                              items-center
                              justify-center
                              hover:text-indigo-600
                              dark:hover:text-indigo-400
                              hover:border-indigo-200
                              dark:hover:border-indigo-500/30
                              hover:bg-indigo-50
                              dark:hover:bg-indigo-500/10
                              transition
                            "
                          >
                            <Eye size={16} />
                          </button>
                        )}

                        {/* EDIT */}

                        {canEdit && (
                          <button
                            type="button"
                            title="Edit Task"
                            onClick={() =>
                              handleEditTask(item._id)
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              border
                              border-slate-200
                              dark:border-slate-700
                              bg-white
                              dark:bg-slate-800
                              text-slate-500
                              dark:text-slate-400
                              flex
                              items-center
                              justify-center
                              hover:text-indigo-600
                              dark:hover:text-indigo-400
                              hover:border-indigo-200
                              dark:hover:border-indigo-500/30
                              hover:bg-indigo-50
                              dark:hover:bg-indigo-500/10
                              transition
                            "
                          >
                            <Edit size={16} />
                          </button>
                        )}

                        {/* DELETE */}

                        {canDelete && (
                          <button
                            type="button"
                            title="Delete Task"
                            onClick={() =>
                              handleDeleteTask(item._id)
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              border
                              border-slate-200
                              dark:border-slate-700
                              bg-white
                              dark:bg-slate-800
                              text-slate-500
                              dark:text-slate-400
                              flex
                              items-center
                              justify-center
                              hover:text-red-600
                              dark:hover:text-red-400
                              hover:border-red-200
                              dark:hover:border-red-500/30
                              hover:bg-red-50
                              dark:hover:bg-red-500/10
                              transition
                            "
                          >
                            <Trash2 size={16} />
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))

              ) : (

                /* EMPTY */

                <tr>
                  <td colSpan="8" className="py-16 text-center">

                    <div
                      className="
                        w-14
                        h-14
                        mx-auto
                        rounded-2xl
                        bg-slate-100
                        dark:bg-slate-800
                        text-slate-400
                        dark:text-slate-500
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                    >
                      <ClipboardList size={26} />
                    </div>

                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                      No tasks found
                    </h3>

                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Try changing your search or filters.
                    </p>

                  </td>
                </tr>

              )}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;