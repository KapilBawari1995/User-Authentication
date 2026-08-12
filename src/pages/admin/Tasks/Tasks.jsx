import React, { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock3,
  AlertCircle,
  User,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useDebounce from "../../../hooks/useDebounce";

import {
  getTasksRequest,
  getTaskByIdRequest,
  deleteTaskRequest,
} from "../../../features/task/taskSlice";

import ViewTaskModal from "./ViewTaskModal";

const Task = ({ projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =====================================================
  // LOCAL STATE
  // =====================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [viewTask, setViewTask] = useState(false);

  // =====================================================
  // DEBOUNCE SEARCH
  // =====================================================

  const debouncedSearch = useDebounce(search, 600);

  // =====================================================
  // PREVENT DUPLICATE API REQUEST
  // =====================================================

  const lastRequestRef = useRef("");

  // =====================================================
  // REDUX - TASK
  // =====================================================

  const {
    tasks = [],
    task,
    loading,
  } = useSelector((state) => state.task);

  // =====================================================
  // REDUX - AUTH USER
  // =====================================================

  const { user } = useSelector((state) => state.auth);

  // =====================================================
  // GET USER ROLE
  // =====================================================

  const roleName =
    typeof user?.role === "object"
      ? user?.role?.name
      : user?.role;

  const normalizedRole = roleName?.toLowerCase();

  // =====================================================
  // ROLE CHECK
  // =====================================================

  const isAdmin = normalizedRole === "admin";

  const isManager = normalizedRole === "manager";

  const isDeveloper = normalizedRole === "developer";

  // =====================================================
  // TASK PERMISSIONS
  // =====================================================

  /*
    ADMIN
    --------------------------------
    Create  ✅
    View    ✅
    Edit    ✅
    Delete  ✅

    MANAGER
    --------------------------------
    Create  ✅
    View    ✅
    Edit    ✅
    Delete  ✅

    DEVELOPER
    --------------------------------
    Create  ❌
    View    ✅
    Edit    ❌
    Delete  ❌
    Work    ✅
  */

  const canCreateTask =
    isAdmin || isManager;

  const canViewTask = true;

  const canEditTask =
    isAdmin || isManager;

  const canDeleteTask =
    isAdmin || isManager;

  // =====================================================
  // DEBUG ROLE
  // =====================================================

  console.log("USER:", user);

  console.log("ROLE:", normalizedRole);

  console.log("TASK PERMISSIONS:", {
    canCreateTask,
    canViewTask,
    canEditTask,
    canDeleteTask,
  });

  // =====================================================
  // FETCH TASKS
  // =====================================================

  useEffect(() => {
    if (!projectId) {
      return;
    }

    const requestData = {
      search: debouncedSearch?.trim() || "",

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

    // ===================================================
    // REQUEST KEY
    // ===================================================

    const requestKey =
      JSON.stringify(requestData);

    // ===================================================
    // DUPLICATE REQUEST CHECK
    // ===================================================

    if (
      lastRequestRef.current === requestKey
    ) {
      return;
    }

    lastRequestRef.current = requestKey;

    console.log(
      "GET TASKS API CALL:",
      requestData
    );

    dispatch(
      getTasksRequest(requestData)
    );
  }, [
    dispatch,
    projectId,
    debouncedSearch,
    statusFilter,
    priorityFilter,
  ]);

  // =====================================================
  // COUNTS
  // =====================================================

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (item) =>
        item.status === "In Progress"
    ).length;

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const handleResetFilters = () => {
    setSearch("");

    setStatusFilter("All");

    setPriorityFilter("All");

    // Reset request ref so API runs again
    lastRequestRef.current = "";
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "In Progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";

      case "Pending":
        return "bg-red-50 text-red-700 border-red-100";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // =====================================================
  // PRIORITY STYLE
  // =====================================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-600 border-red-100";

      case "Medium":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";

      case "Low":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // =====================================================
  // VIEW TASK
  // =====================================================

  const handleViewTask = (taskId) => {
    if (!canViewTask) {
      return;
    }

    dispatch(
      getTaskByIdRequest(taskId)
    );

    setViewTask(true);
  };

  // =====================================================
  // EDIT TASK
  // =====================================================

  const handleEditTask = (taskId) => {
    if (!canEditTask) {
      return;
    }

    navigate(
      `/admin/tasks/edit/${taskId}`
    );
  };

  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDeleteTask = (taskId) => {
    if (!canDeleteTask) {
      return;
    }

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) {
      return;
    }

    dispatch(
      deleteTaskRequest(taskId)
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div>

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

        {/* TOTAL */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Tasks
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {totalTasks}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                All available tasks
              </p>

            </div>

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-indigo-50
                text-indigo-600
                flex
                items-center
                justify-center
              "
            >
              <ClipboardList size={23} />
            </div>

          </div>
        </div>

        {/* COMPLETED */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                {completedTasks}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Completed tasks
              </p>

            </div>

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-emerald-50
                text-emerald-600
                flex
                items-center
                justify-center
              "
            >
              <CheckCircle2 size={22} />
            </div>

          </div>
        </div>

        {/* IN PROGRESS */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                In Progress
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {inProgressTasks}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Currently running
              </p>

            </div>

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-yellow-50
                text-yellow-600
                flex
                items-center
                justify-center
              "
            >
              <Clock3 size={22} />
            </div>

          </div>
        </div>

        {/* PENDING */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {pendingTasks}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Tasks waiting
              </p>

            </div>

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-red-50
                text-red-600
                flex
                items-center
                justify-center
              "
            >
              <AlertCircle size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* ================================================= */}
      {/* SEARCH / FILTER */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          border border-slate-200
          rounded-2xl
          p-4
          mb-6
          shadow-sm
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
              "
            />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-12
                pl-11
                pr-4
                border border-slate-200
                rounded-xl
                bg-slate-50
                text-sm
                outline-none
                focus:bg-white
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-50
                transition
              "
            />

          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              h-12
              min-w-[180px]
              px-4
              border border-slate-200
              rounded-xl
              bg-slate-50
              text-sm
              text-slate-700
              outline-none
              focus:bg-white
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-50
            "
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

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
              border border-slate-200
              rounded-xl
              bg-slate-50
              text-sm
              text-slate-700
              outline-none
              focus:bg-white
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-50
            "
          >

            <option value="All">
              All Priority
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

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
              hover:bg-slate-200
              text-slate-700
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
      {/* TABLE */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          overflow-hidden
        "
      >

        {/* TABLE HEADER */}

        <div
          className="
            px-6
            py-5
            border-b
            border-slate-200
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2 className="font-bold text-slate-800">
              All Tasks
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {totalTasks} tasks available
            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-slate-400
            "
          >
            <CheckCircle2 size={15} />

            Task management
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* TABLE HEAD */}

            <thead>

              <tr className="bg-slate-50">

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  #
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Task
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Assigned To
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Priority
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Due Date
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}

            <tbody className="divide-y divide-slate-100">

              {/* ================================================= */}
              {/* LOADING */}
              {/* ================================================= */}

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="py-16 text-center"
                  >

                    <div
                      className="
                        w-8
                        h-8
                        mx-auto
                        border-[3px]
                        border-indigo-600
                        border-t-transparent
                        rounded-full
                        animate-spin
                      "
                    />

                    <p className="text-sm text-slate-500 mt-4">
                      Loading tasks...
                    </p>

                  </td>

                </tr>

              ) : tasks.length > 0 ? (

                /* ================================================= */
                /* TASK LIST */
                /* ================================================= */

                tasks.map((item, index) => (

                  <tr
                    key={item._id}
                    className="
                      group
                      hover:bg-slate-50/80
                      transition-colors
                    "
                  >

                    {/* NUMBER */}

                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-400">
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
                            text-indigo-600
                            flex
                            items-center
                            justify-center
                            border
                            border-indigo-100
                          "
                        >
                          <ClipboardList size={20} />
                        </div>

                        <div className="max-w-xs">

                          <p className="font-semibold text-slate-800">
                            {item.title}
                          </p>

                          <p className="text-xs text-slate-400 mt-1 truncate">
                            {item.description || "No description"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ASSIGNED TO */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-slate-100
                            text-slate-500
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <User size={16} />
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-700">
                            {item.assignedTo?.name || "-"}
                          </p>

                          {item.assignedTo?.email && (
                            <p className="text-[11px] text-slate-400">
                              {item.assignedTo.email}
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
                          ${getPriorityStyle(
                            item.priority
                          )}
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
                          ${getStatusStyle(
                            item.status
                          )}
                        `}
                      >
                        {item.status || "-"}
                      </span>

                    </td>

                    {/* DUE DATE */}

                    <td className="px-6 py-5">

                      <p className="text-sm text-slate-600">

                        {item.dueDate
                          ? new Date(
                              item.dueDate
                            ).toLocaleDateString()
                          : "-"}

                      </p>

                    </td>

                    {/* ================================================= */}
                    {/* ACTIONS */}
                    {/* ================================================= */}

                    <td className="px-6 py-5">

                      <div
                        className="
                          flex
                          items-center
                          justify-end
                          gap-2
                        "
                      >

                        {/* =========================================== */}
                        {/* VIEW - ADMIN + MANAGER + DEVELOPER */}
                        {/* =========================================== */}

                        {canViewTask && (
                          <button
                            type="button"
                            title="View Task"
                            onClick={() =>
                              handleViewTask(
                                item._id
                              )
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              text-slate-500
                              flex
                              items-center
                              justify-center
                              hover:text-indigo-600
                              hover:border-indigo-200
                              hover:bg-indigo-50
                              transition
                            "
                          >
                            <Eye size={16} />
                          </button>
                        )}

                        {/* =========================================== */}
                        {/* EDIT - ADMIN + MANAGER ONLY */}
                        {/* =========================================== */}

                        {canEditTask && (
                          <button
                            type="button"
                            title="Edit Task"
                            onClick={() =>
                              handleEditTask(
                                item._id
                              )
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              text-slate-500
                              flex
                              items-center
                              justify-center
                              hover:text-indigo-600
                              hover:border-indigo-200
                              hover:bg-indigo-50
                              transition
                            "
                          >
                            <Edit size={16} />
                          </button>
                        )}

                        {/* =========================================== */}
                        {/* DELETE - ADMIN + MANAGER ONLY */}
                        {/* =========================================== */}

                        {canDeleteTask && (
                          <button
                            type="button"
                            title="Delete Task"
                            onClick={() =>
                              handleDeleteTask(
                                item._id
                              )
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              text-slate-500
                              flex
                              items-center
                              justify-center
                              hover:text-red-600
                              hover:border-red-200
                              hover:bg-red-50
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

                /* ================================================= */
                /* EMPTY */
                /* ================================================= */

                <tr>

                  <td
                    colSpan="7"
                    className="py-16 text-center"
                  >

                    <div
                      className="
                        w-14
                        h-14
                        mx-auto
                        rounded-2xl
                        bg-slate-100
                        text-slate-400
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                    >
                      <ClipboardList size={26} />
                    </div>

                    <h3 className="font-semibold text-slate-700">
                      No tasks found
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================================= */}
      {/* VIEW TASK MODAL */}
      {/* ================================================= */}

      <ViewTaskModal
        task={task}
        open={viewTask}
        onClose={() =>
          setViewTask(false)
        }
      />

    </div>
  );
};

export default Task;