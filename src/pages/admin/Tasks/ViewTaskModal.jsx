import React, { useEffect } from "react";
import {
  ArrowLeft,
  ClipboardList,
  User,
  Mail,
  Calendar,
  Clock3,
  Flag,
  CircleCheck,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getTaskByIdRequest,
  clearTaskState,
} from "../../../features/task/taskSlice";

const ViewTask = () => {
  const navigate = useNavigate();
  const  {id }= useParams();
  const dispatch = useDispatch();
  const { task, getTaskLoading, getTaskError } = useSelector(
    (state) => state.task
  );

  // =====================================================
  // GET TASK BY ID
  // =====================================================

  useEffect(() => {
    if (id) {
      dispatch(getTaskByIdRequest(id));
    }
console.log(id)

    return () => {
      dispatch(clearTaskState());
    };
  }, [dispatch, id]);

  // =====================================================
  // PRIORITY STYLE
  // =====================================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return `
          bg-red-50 dark:bg-red-500/10
          text-red-700 dark:text-red-400
          border-red-100 dark:border-red-500/20
        `;

      case "Medium":
        return `
          bg-yellow-50 dark:bg-yellow-500/10
          text-yellow-700 dark:text-yellow-400
          border-yellow-100 dark:border-yellow-500/20
        `;

      case "Low":
        return `
          bg-green-50 dark:bg-green-500/10
          text-green-700 dark:text-green-400
          border-green-100 dark:border-green-500/20
        `;

      default:
        return `
          bg-slate-50 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-100 dark:border-slate-700
        `;
    }
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
          bg-blue-50 dark:bg-blue-500/10
          text-blue-700 dark:text-blue-400
          border-blue-100 dark:border-blue-500/20
        `;

      case "Pending":
        return `
          bg-orange-50 dark:bg-orange-500/10
          text-orange-700 dark:text-orange-400
          border-orange-100 dark:border-orange-500/20
        `;

      case "Submitted for QA":
        return `
          bg-violet-50 dark:bg-violet-500/10
          text-violet-700 dark:text-violet-400
          border-violet-100 dark:border-violet-500/20
        `;

      case "Changes Required":
        return `
          bg-red-50 dark:bg-red-500/10
          text-red-700 dark:text-red-400
          border-red-100 dark:border-red-500/20
        `;

      default:
        return `
          bg-slate-50 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-100 dark:border-slate-700
        `;
    }
  };

  // =====================================================
  // OPEN WORKSPACE
  // =====================================================

 const handleOpenWorkspace = () => {
  if (!task?._id) return;

  navigate(`/admin/tasks/workspace/${task._id}`);
};
  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    navigate(-1);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (getTaskLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading task details...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (getTaskError) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={handleBack}
            className="
              inline-flex
              items-center
              gap-2
              mb-6
              text-sm
              font-semibold
              text-slate-600
              dark:text-slate-300
              hover:text-indigo-600
              dark:hover:text-indigo-400
              transition
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div
            className="
              bg-white
              dark:bg-slate-900
              border
              border-red-200
              dark:border-red-500/20
              rounded-2xl
              p-8
              text-center
            "
          >
            <div
              className="
                w-14 h-14
                mx-auto
                rounded-full
                bg-red-50
                dark:bg-red-500/10
                text-red-600
                dark:text-red-400
                flex
                items-center
                justify-center
                mb-4
              "
            >
              <CircleCheck size={25} />
            </div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Unable to Load Task
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {getTaskError || "Something went wrong while loading the task."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // TASK NOT FOUND
  // =====================================================

  if (!task) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={handleBack}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              dark:text-slate-300
              hover:text-indigo-600
              dark:hover:text-indigo-400
              transition
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              Task not found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div className="mb-6">

          <button
            type="button"
            onClick={handleBack}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              dark:text-slate-300
              hover:text-indigo-600
              dark:hover:text-indigo-400
              transition
              mb-5
            "
          >
            <ArrowLeft size={18} />
            Back to Tasks
          </button>

          <div
            className="
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-700
              rounded-2xl
              shadow-sm
              p-6
            "
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-start gap-4">

                <div
                  className="
                    w-14 h-14
                    shrink-0
                    rounded-xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    shadow-indigo-100
                    dark:shadow-none
                  "
                >
                  <ClipboardList size={25} />
                </div>

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-indigo-600
                      dark:text-indigo-400
                      mb-1
                    "
                  >
                    Task Details
                  </p>

                  <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {task.title}
                  </h1>

                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                    View complete task information
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

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
                    ${getStatusStyle(task.status)}
                  `}
                >
                  {task.status || "-"}
                </span>

              </div>

            </div>

          </div>
        </div>

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================================================= */}
          {/* LEFT / MAIN */}
          {/* ================================================= */}

          <div className="lg:col-span-2 space-y-6">

            {/* TASK TITLE */}

            <div
              className="
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                p-6
                shadow-sm
              "
            >

              <div className="flex items-start gap-4">

                <div
                  className="
                    w-11 h-11
                    shrink-0
                    rounded-xl
                    bg-indigo-50
                    dark:bg-indigo-500/10
                    text-indigo-600
                    dark:text-indigo-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FileText size={20} />
                </div>

                <div className="flex-1 min-w-0">

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Task Title
                  </p>

                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mt-1 break-words">
                    {task.title || "-"}
                  </h2>

                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div
              className="
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                p-6
                shadow-sm
              "
            >

              <div className="flex items-center gap-2 mb-4">

                <FileText
                  size={19}
                  className="text-indigo-600 dark:text-indigo-400"
                />

                <h3 className="font-semibold text-slate-800 dark:text-white">
                  Description
                </h3>

              </div>

              <div
                className="
                  bg-slate-50
                  dark:bg-slate-800/60
                  rounded-xl
                  p-5
                "
              >
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-7 whitespace-pre-wrap">
                  {task.description || "No description provided."}
                </p>
              </div>

            </div>

            {/* STATUS / PRIORITY */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* PRIORITY */}

              <div
                className="
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-2xl
                  p-5
                  shadow-sm
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-11 h-11
                      rounded-xl
                      bg-red-50
                      dark:bg-red-500/10
                      text-red-600
                      dark:text-red-400
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Flag size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Priority
                    </p>

                    <span
                      className={`
                        inline-flex
                        items-center
                        mt-1
                        px-3
                        py-1
                        rounded-full
                        border
                        text-xs
                        font-semibold
                        ${getPriorityStyle(task.priority)}
                      `}
                    >
                      {task.priority || "-"}
                    </span>

                  </div>

                </div>

              </div>

              {/* STATUS */}

              <div
                className="
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-2xl
                  p-5
                  shadow-sm
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-11 h-11
                      rounded-xl
                      bg-emerald-50
                      dark:bg-emerald-500/10
                      text-emerald-600
                      dark:text-emerald-400
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <CircleCheck size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Status
                    </p>

                    <span
                      className={`
                        inline-flex
                        items-center
                        mt-1
                        px-3
                        py-1
                        rounded-full
                        border
                        text-xs
                        font-semibold
                        ${getStatusStyle(task.status)}
                      `}
                    >
                      {task.status || "-"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <div className="space-y-6">

            {/* ASSIGNMENT */}

            <div
              className="
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                p-6
                shadow-sm
              "
            >

              <h3 className="font-semibold text-slate-800 dark:text-white mb-5">
                Assignment
              </h3>

              {/* CREATED BY */}

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-blue-50
                    dark:bg-blue-500/10
                    text-blue-600
                    dark:text-blue-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Created By
                  </p>

                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 mt-1 truncate">
                    {task.createdBy?.name || "-"}
                  </p>

                </div>

              </div>

              {/* ASSIGNED TO */}

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-violet-50
                    dark:bg-violet-500/10
                    text-violet-600
                    dark:text-violet-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Assigned To
                  </p>

                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 mt-1 truncate">
                    {task.assignedTo?.name || "-"}
                  </p>

                </div>

              </div>

              {/* EMAIL */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-emerald-50
                    dark:bg-emerald-500/10
                    text-emerald-600
                    dark:text-emerald-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Mail size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Assigned User Email
                  </p>

                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 mt-1 truncate">
                    {task.assignedTo?.email || "-"}
                  </p>

                </div>

              </div>

            </div>

            {/* DATES */}

            <div
              className="
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                p-6
                shadow-sm
              "
            >

              <h3 className="font-semibold text-slate-800 dark:text-white mb-5">
                Task Dates
              </h3>

              {/* DUE DATE */}

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-orange-50
                    dark:bg-orange-500/10
                    text-orange-600
                    dark:text-orange-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Calendar size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Due Date
                  </p>

                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

              </div>

              {/* CREATED DATE */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-indigo-50
                    dark:bg-indigo-500/10
                    text-indigo-600
                    dark:text-indigo-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Clock3 size={18} />
                </div>

                <div>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Created At
                  </p>

                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

              </div>

            </div>

            {/* WORKSPACE */}

            {task.assignedTo && (
              <div
                className="
                  bg-gradient-to-br
                  from-indigo-600
                  to-violet-600
                  rounded-2xl
                  p-6
                  shadow-lg
                "
              >

                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-white/15
                    text-white
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <BriefcaseBusiness size={20} />
                </div>

                <h3 className="text-white font-bold text-lg">
                  Task Workspace
                </h3>

                <p className="text-indigo-100 text-sm mt-2 leading-6">
                  Open the task workspace to manage and work on this task.
                </p>

                <button
                  type="button"
                  onClick={handleOpenWorkspace}
                  className="
                    w-full
                    mt-5
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-white
                    text-indigo-600
                    text-sm
                    font-bold
                    hover:bg-indigo-50
                    transition
                  "
                >
                  <BriefcaseBusiness size={17} />
                  Open Task Workspace
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewTask;