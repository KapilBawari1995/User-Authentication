import React, { useEffect } from "react";

import {
  ArrowLeft,
  Edit,
  Plus,
  FolderKanban,
  Users,
  CalendarDays,
  Wallet,
  User,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProjectByIdRequest,
} from "../../../features/project/projectSlice";

import TeamMembersTask from "../Tasks/TeamMembersTask";
import Tasks from "../Tasks/Tasks";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectId } = useParams();

  // =====================================================
  // REDUX
  // =====================================================

  const {
    project,
    getProjectLoading,
    getProjectError,
  } = useSelector((state) => state.project);

  // =====================================================
  // GET PROJECT BY ID
  // =====================================================

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectByIdRequest(projectId));
    }
  }, [dispatch, projectId]);

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Planning":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "On Hold":
        return "bg-slate-100 text-slate-600 border-slate-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (getProjectLoading) {
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
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (getProjectError) {
    return (
      <div>
        <button
          onClick={() => navigate("/admin/projects")}
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
            {getProjectError}
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // NO PROJECT
  // =====================================================

  if (!project) {
    return null;
  }

  // =====================================================
  // PROJECT DATA
  // =====================================================

  const managerName =
    project?.projectManager?.name || "Not Assigned";

  const managerEmail =
    project?.projectManager?.email || "";

  const teamMembers =
    project?.teamMembers || [];

  // =====================================================
  // UI
  // =====================================================

  return (
    <div>

      {/* ================================================= */}
      {/* BACK */}
      {/* ================================================= */}

      <button
        onClick={() => navigate("/admin/projects")}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-500
          hover:text-indigo-600
          mb-5
          transition
        "
      >
        <ArrowLeft size={18} />
        Back to Projects
      </button>

      {/* ================================================= */}
      {/* PROJECT HEADER */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          border border-slate-200
          rounded-2xl
          shadow-sm
          p-6
          mb-6
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-start
            lg:justify-between
            gap-6
          "
        >

          {/* ================= LEFT ================= */}

          <div className="flex gap-4">

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-indigo-50
                text-indigo-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <FolderKanban size={27} />
            </div>

            <div>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >

                <h1
                  className="
                    text-2xl
                    font-bold
                    text-slate-800
                  "
                >
                  {project.name}
                </h1>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    border
                    text-xs
                    font-semibold
                    ${getStatusStyle(project.status)}
                  `}
                >
                  {project.status || "Planning"}
                </span>

              </div>

              <p
                className="
                  text-sm
                  text-slate-500
                  mt-2
                  max-w-3xl
                "
              >
                {project.description ||
                  "No project description available."}
              </p>

            </div>

          </div>

          {/* ================= ACTIONS ================= */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

        

            <button
              onClick={() =>
                navigate(
                  `/admin/projects/${project._id}/tasks/create`
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                text-sm
                font-semibold
                shadow-sm
                transition
              "
            >
              <Plus size={18} />
              Add Task
            </button>

          </div>
        </div>

        {/* ================================================= */}
        {/* PROJECT INFO */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            mt-7
            pt-6
            border-t
            border-slate-100
          "
        >

          {/* ================= MANAGER ================= */}

          <div className="flex items-start gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-slate-100
                text-slate-500
                flex
                items-center
                justify-center
              "
            >
              <User size={18} />
            </div>

            <div>

              <p className="text-xs text-slate-400">
                Project Manager
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                  mt-1
                "
              >
                {managerName}
              </p>

              {managerEmail && (
                <p
                  className="
                    text-xs
                    text-slate-400
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
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
              "
            >
              <Users size={18} />
            </div>

            <div>

              <p className="text-xs text-slate-400">
                Team Members
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-700
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
                bg-amber-50
                text-amber-600
                flex
                items-center
                justify-center
              "
            >
              <CalendarDays size={18} />
            </div>

            <div>

              <p className="text-xs text-slate-400">
                Timeline
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                  mt-1
                "
              >
                {formatDate(project.startDate)}
              </p>

              <p className="text-xs text-slate-400">
                → {formatDate(project.endDate)}
              </p>

            </div>

          </div>

          {/* ================= BUDGET ================= */}

          <div className="flex items-start gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-emerald-50
                text-emerald-600
                flex
                items-center
                justify-center
              "
            >
              <Wallet size={18} />
            </div>

            <div>

              <p className="text-xs text-slate-400">
                Budget
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                  mt-1
                "
              >
                {project.budget
                  ? `₹ ${project.budget}`
                  : "Not Available"}
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================= */}
      {/* TEAM MEMBERS COMPONENT */}
      {/* ================================================= */}

    <TeamMembersTask
  teamMembers={teamMembers}
  projectId={project._id}
/>

      {/* ================================================= */}
      {/* TASKS COMPONENT */}
      {/* ================================================= */}

      <Tasks
        projectId={project._id}
      />

    </div>
  );
};

export default ProjectDetails;