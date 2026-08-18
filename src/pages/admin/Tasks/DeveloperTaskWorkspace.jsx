import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  User,
  Calendar,
  Clock3,
  Flag,
  FileText,
  FolderKanban,
  MessageSquare,
  Play,
  Send,
  Paperclip,
  CheckCircle2,
  History,
  Timer,
  AlertCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getTaskByIdRequest,
  clearTaskState,
} from "../../../features/task/taskSlice";

const DeveloperTaskWorkspace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId, id } = useParams();

  const { task, getTaskLoading, getTaskError } = useSelector(
    (state) => state.task
  );

  // =====================================================
  // LOCAL WORKSPACE STATE
  // =====================================================

  const [currentStatus, setCurrentStatus] = useState("");
  const [comment, setComment] = useState("");
  const [workStarted, setWorkStarted] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // =====================================================
  // GET TASK
  // =====================================================

  useEffect(() => {
    if (id) {
      dispatch(getTaskByIdRequest(id));
    }

    return () => {
      dispatch(clearTaskState());
    };
  }, [dispatch, id]);

  // =====================================================
  // SET TASK STATUS
  // =====================================================

  useEffect(() => {
    if (task?.status) {
      setCurrentStatus(task.status);

      if (task.status === "In Progress") {
        setWorkStarted(true);
      }
    }
  }, [task]);

  // =====================================================
  // TIMER
  // =====================================================

  useEffect(() => {
    if (!timeStarted) return;

    const timer = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - timeStarted) / 1000)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [timeStarted]);

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  // =====================================================
  // START WORK
  // =====================================================

  const handleStartWork = () => {
    setCurrentStatus("In Progress");
    setWorkStarted(true);
    setTimeStarted(Date.now());
  };

  // =====================================================
  // STOP TIMER
  // =====================================================

  const handleStopTimer = () => {
    setTimeStarted(null);
  };

  // =====================================================
  // SUBMIT FOR QA
  // =====================================================

  const handleSubmitForQA = () => {
    if (!comment.trim()) {
      alert("Please add a work update before submitting for QA.");
      return;
    }

    setCurrentStatus("Submitted for QA");
    setTimeStarted(null);
    setWorkStarted(false);
  };

  // =====================================================
  // ADD COMMENT
  // =====================================================

  const handleAddComment = () => {
    if (!comment.trim()) return;

    console.log("Developer Update:", comment);

    setComment("");
  };

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    navigate(-1);
  };

  // =====================================================
  // PRIORITY
  // =====================================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200";

      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Low":
        return "bg-green-50 text-green-700 border-green-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "Submitted for QA":
        return "bg-violet-50 text-violet-700 border-violet-200";

      case "Changes Required":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // =====================================================
  // WORK ACTION
  // =====================================================

  const actionType = useMemo(() => {
    if (currentStatus === "Pending") {
      return "start";
    }

    if (currentStatus === "Changes Required") {
      return "start";
    }

    if (currentStatus === "In Progress") {
      return "submit";
    }

    return "waiting";
  }, [currentStatus]);

  // =====================================================
  // LOADING
  // =====================================================

  if (getTaskLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              border-4
              border-slate-200
              border-t-indigo-600
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-3 text-sm text-slate-500">
            Loading workspace...
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
        <div className="max-w-5xl mx-auto">

          <button
            onClick={handleBack}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              hover:text-indigo-600
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div
            className="
              mt-6
              bg-white
              dark:bg-slate-900
              rounded-2xl
              border
              border-red-200
              p-8
              text-center
            "
          >
            <AlertCircle
              size={35}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-3 font-bold text-xl">
              Unable to load task
            </h2>

            <p className="mt-2 text-sm text-red-500">
              {getTaskError}
            </p>
          </div>

        </div>
      </div>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-6">

          <button
            type="button"
            onClick={handleBack}
            className="
              inline-flex
              items-center
              gap-2
              mb-5
              text-sm
              font-semibold
              text-slate-600
              dark:text-slate-300
              hover:text-indigo-600
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Task
          </button>

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

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div className="flex items-start gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-xl
                    bg-gradient-to-br
                    from-indigo-600
                    to-violet-600
                    flex
                    items-center
                    justify-center
                    text-white
                    shrink-0
                  "
                >
                  <ClipboardList size={25} />
                </div>

                <div>

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      font-bold
                      text-indigo-600
                    "
                  >
                    Developer Workspace
                  </p>

                  <h1 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                    {task.title}
                  </h1>

                  <p className="text-sm text-slate-400 mt-1">
                    Work on your assigned task and submit it for QA.
                  </p>

                </div>

              </div>

              <span
                className={`
                  inline-flex
                  w-fit
                  px-4
                  py-2
                  rounded-full
                  border
                  text-sm
                  font-semibold
                  ${getStatusStyle(currentStatus)}
                `}
              >
                {currentStatus}
              </span>

            </div>

          </div>
        </div>

        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="lg:col-span-2 space-y-6">

            {/* TASK DETAILS */}

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

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FileText size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800 dark:text-white">
                    Task Details
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    What needs to be completed
                  </p>
                </div>

              </div>

              <div
                className="
                  bg-slate-50
                  dark:bg-slate-800/60
                  rounded-xl
                  p-5
                "
              >
                <p className="text-lg font-bold text-slate-800 dark:text-white">
                  {task.title}
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                  {task.description || "No description provided."}
                </p>
              </div>

            </div>

            {/* ================================================= */}
            {/* WORK CONTROL */}
            {/* ================================================= */}

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

              <div className="flex items-center justify-between gap-4 mb-6">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Play size={18} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800 dark:text-white">
                      Work Control
                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                      Manage your development work
                    </p>
                  </div>

                </div>

                {timeStarted && (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      rounded-xl
                      bg-emerald-50
                      text-emerald-700
                      text-sm
                      font-bold
                    "
                  >
                    <Timer size={16} />

                    {formatTime(elapsedSeconds)}
                  </div>
                )}

              </div>

              {/* PENDING / CHANGES REQUIRED */}

              {actionType === "start" && (
                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-slate-50
                    dark:bg-slate-800/50
                    p-6
                  "
                >

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-indigo-100
                        text-indigo-600
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <Play size={20} />
                    </div>

                    <div className="flex-1">

                      <h3 className="font-bold text-slate-800 dark:text-white">
                        {currentStatus === "Changes Required"
                          ? "Changes are required"
                          : "Ready to start"}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {currentStatus === "Changes Required"
                          ? "Review the tester feedback, make the required changes, and start working again."
                          : "Start working on this task when you are ready."}
                      </p>

                      <button
                        type="button"
                        onClick={handleStartWork}
                        className="
                          mt-5
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          px-5
                          py-3
                          rounded-xl
                          bg-indigo-600
                          text-white
                          text-sm
                          font-bold
                          hover:bg-indigo-700
                          transition
                        "
                      >
                        <Play size={17} />
                        Start Working
                      </button>

                    </div>

                  </div>

                </div>
              )}

              {/* IN PROGRESS */}

              {actionType === "submit" && (
                <div className="space-y-5">

                  <div
                    className="
                      rounded-xl
                      bg-blue-50
                      border
                      border-blue-200
                      p-5
                    "
                  >

                    <div className="flex items-center gap-3">

                      <CheckCircle2
                        size={22}
                        className="text-blue-600"
                      />

                      <div>

                        <p className="font-bold text-blue-800">
                          Development in progress
                        </p>

                        <p className="text-sm text-blue-700 mt-1">
                          Complete your work and submit the task for QA review.
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* UPDATE */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      Work Update
                    </label>

                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={5}
                      placeholder="Describe what you completed, what is pending, or any important information for QA..."
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-800
                        px-4
                        py-3
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-indigo-500/20
                        focus:border-indigo-500
                        text-slate-700
                        dark:text-slate-200
                      "
                    />

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <button
                      type="button"
                      onClick={handleStopTimer}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-slate-200
                        dark:border-slate-700
                        text-sm
                        font-semibold
                        text-slate-600
                        dark:text-slate-300
                        hover:bg-slate-50
                        dark:hover:bg-slate-800
                      "
                    >
                      <Timer size={17} />
                      Stop Timer
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmitForQA}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-5
                        py-3
                        rounded-xl
                        bg-indigo-600
                        text-white
                        text-sm
                        font-bold
                        hover:bg-indigo-700
                      "
                    >
                      <Send size={17} />
                      Submit for QA
                    </button>

                  </div>

                </div>
              )}

              {/* WAITING FOR QA */}

              {actionType === "waiting" && (
                <div
                  className="
                    rounded-xl
                    border
                    border-violet-200
                    bg-violet-50
                    p-6
                  "
                >

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-violet-100
                        text-violet-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <CheckCircle2 size={20} />
                    </div>

                    <div>

                      <h3 className="font-bold text-violet-800">
                        Submitted for QA
                      </h3>

                      <p className="text-sm text-violet-700 mt-1">
                        Your work has been submitted. Please wait for the tester's review.
                      </p>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* ================================================= */}
            {/* WORK UPDATE */}
            {/* ================================================= */}

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

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-violet-50
                    text-violet-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MessageSquare size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800 dark:text-white">
                    Task Updates
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    Keep your team updated
                  </p>
                </div>

              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Write a progress update..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-indigo-500
                  text-slate-700
                  dark:text-slate-200
                "
              />

              <div className="flex justify-end mt-3">

                <button
                  type="button"
                  onClick={handleAddComment}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-slate-900
                    dark:bg-white
                    text-white
                    dark:text-slate-900
                    text-sm
                    font-semibold
                  "
                >
                  <MessageSquare size={16} />
                  Add Update
                </button>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <div className="space-y-6">

            {/* ASSIGNED TO */}

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

              <h3 className="font-bold text-slate-800 dark:text-white mb-5">
                Assigned To
              </h3>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-violet-50
                    text-violet-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User size={20} />
                </div>

                <div className="min-w-0">

                  <p className="font-semibold text-slate-700 dark:text-slate-200 truncate">
                    {task.assignedTo?.name || "-"}
                  </p>

                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {task.assignedTo?.email || "-"}
                  </p>

                </div>

              </div>

            </div>

            {/* TASK INFO */}

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

              <h3 className="font-bold text-slate-800 dark:text-white mb-5">
                Task Information
              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-3">

                  <Flag size={18} className="text-orange-500" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Priority
                    </p>

                    <span
                      className={`
                        inline-flex
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

                <div className="flex items-center gap-3">

                  <Calendar size={18} className="text-blue-500" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Due Date
                    </p>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Clock3 size={18} className="text-violet-500" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Estimated Time
                    </p>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                      {task.estimatedHours || 0} Hours
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* TIME TRACKER */}

            <div
              className="
                bg-gradient-to-br
                from-indigo-600
                to-violet-600
                rounded-2xl
                p-6
                text-white
                shadow-lg
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white/15
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Timer size={20} />
                </div>

                <div>
                  <p className="text-indigo-100 text-xs">
                    Session Time
                  </p>

                  <p className="font-bold text-xl mt-1">
                    {formatTime(elapsedSeconds)}
                  </p>
                </div>

              </div>

            </div>

            {/* ATTACHMENTS */}

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

              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-slate-100
                      text-slate-600
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Paperclip size={18} />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800 dark:text-white">
                      Attachments
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Task files
                    </p>

                  </div>

                </div>

              </div>

              {task.attachments?.length > 0 ? (
                <div className="space-y-2">

                  {task.attachments.map((file, index) => (
                    <div
                      key={file?._id || index}
                      className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        bg-slate-50
                        dark:bg-slate-800
                      "
                    >
                      <Paperclip
                        size={16}
                        className="text-indigo-500"
                      />

                      <span className="text-sm text-slate-600 dark:text-slate-300 truncate">
                        {file?.name || `Attachment ${index + 1}`}
                      </span>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  No attachments added.
                </p>
              )}

            </div>

            {/* PROJECT */}

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

              <div className="flex items-center gap-3 mb-4">

                <FolderKanban
                  size={19}
                  className="text-indigo-600"
                />

                <h3 className="font-bold text-slate-800 dark:text-white">
                  Project
                </h3>

              </div>

              <p className="text-xs text-slate-400">
                Project ID
              </p>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1 break-all">
                {task.project || projectId || "-"}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DeveloperTaskWorkspace;