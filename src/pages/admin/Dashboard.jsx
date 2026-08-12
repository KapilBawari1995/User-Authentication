import React, { useEffect } from "react";

import {
  Users,
  UserCheck,
  UserRoundCheck,
  FolderKanban,
  CheckCircle2,
  Clock3,
  PlayCircle,
  MoreHorizontal,
  ArrowUpRight,
  CalendarDays,
  Activity,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getDashboardRequest } from "../../features/dashboard/dashboardSlice";

import { getProjectsRequest } from "../../features/project/projectSlice";


// =====================================================
// DASHBOARD
// =====================================================

const Dashboard = () => {
  const dispatch = useDispatch();

  // =====================================================
  // DASHBOARD REDUX
  // =====================================================

  const {
    dashboard,
    dashboardType,
    getDashboardLoading,
    getDashboardError,
  } = useSelector((state) => state.dashboard);

  // =====================================================
  // PROJECT REDUX
  // =====================================================

  const {
    projects = [],
    getProjectsLoading,
    getProjectsError,
  } = useSelector((state) => state.project);

  // =====================================================
  // GET DASHBOARD
  // =====================================================

  useEffect(() => {
    dispatch(getDashboardRequest());
  }, [dispatch]);

  // =====================================================
  // GET PROJECTS
  // =====================================================

  useEffect(() => {
    dispatch(
      getProjectsRequest({
        page: 1,
        pageSize: 100,
        search: "",
      })
    );
  }, [dispatch]);

  // =====================================================
  // LOADING
  // =====================================================

  if (getDashboardLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
        <div className="w-9 h-9 mx-auto border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin" />

        <p className="text-sm text-slate-500 mt-4">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (getDashboardError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-sm font-medium text-red-600">
          {getDashboardError}
        </p>
      </div>
    );
  }

  // =====================================================
  // API DATA
  // =====================================================

  const data = dashboard || {};

  // =====================================================
  // IMPORTANT
  //
  // USER DATA ONLY EXISTS WHEN API SENDS USER VALUES.
  //
  // Example Manager/User response:
  // {
  //   myTasks: 2,
  //   completedTasks: 0,
  //   pendingTasks: 2,
  //   inProgressTasks: 0
  // }
  //
  // In that case User Overview will NOT show.
  // =====================================================

  const hasUserOverview =
    Object.prototype.hasOwnProperty.call(data, "totalUsers") ||
    Object.prototype.hasOwnProperty.call(data, "activeUsers") ||
    Object.prototype.hasOwnProperty.call(data, "inactiveUsers") ||
    Object.prototype.hasOwnProperty.call(data, "totalManagers");

  // =====================================================
  // PROJECT DATA
  // =====================================================

  const projectStatus = {
    active:
      Number(data.activeProjects ?? 0),

    completed:
      Number(data.completedProjects ?? 0),

    pending:
      Number(data.pendingProjects ?? 0),

    onHold:
      Number(data.onHoldProjects ?? 0),

    cancelled:
      Number(data.cancelledProjects ?? 0),
  };

  // =====================================================
  // PROJECT COUNT
  // =====================================================

  const totalProjects =
    Number(data.totalProjects ?? 0) ||
    projects.length;

  // =====================================================
  // USER DATA
  // =====================================================

  const totalUsers = Number(
    data.totalUsers ?? 0
  );

  const activeUsers = Number(
    data.activeUsers ?? 0
  );

  const inactiveUsers = Math.max(
    totalUsers - activeUsers,
    0
  );

  // =====================================================
  // MANAGERS
  // =====================================================

  const totalManagers = Number(
    data.totalManagers ?? 0
  );

  // =====================================================
  // PROJECT COUNTS
  // =====================================================

  const activeProjects = Number(
    data.activeProjects ??
      projects.filter(
        (project) => project.status === "In Progress"
      ).length
  );

  const completedProjects = Number(
    data.completedProjects ??
      projects.filter(
        (project) => project.status === "Completed"
      ).length
  );

  const pendingProjects = Number(
    data.pendingProjects ??
      projects.filter(
        (project) => project.status === "Planning"
      ).length
  );

  const onHoldProjects = Number(
    data.onHoldProjects ??
      projects.filter(
        (project) => project.status === "On Hold"
      ).length
  );

  const cancelledProjects = Number(
    data.cancelledProjects ??
      projects.filter(
        (project) => project.status === "Cancelled"
      ).length
  );

  // =====================================================
  // CARD CONFIGURATION
  // =====================================================

  const cardConfig = {
    totalUsers: {
      title: "Total Users",
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },

    activeUsers: {
      title: "Active Users",
      icon: UserCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },

    totalManagers: {
      title: "Total Managers",
      icon: UserRoundCheck,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },

    totalProjects: {
      title: "Total Projects",
      icon: FolderKanban,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    activeProjects: {
      title: "Active Projects",
      icon: PlayCircle,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },

    completedProjects: {
      title: "Completed Projects",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },

    pendingProjects: {
      title: "Pending Projects",
      icon: Clock3,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },

    onHoldProjects: {
      title: "On Hold Projects",
      icon: Clock3,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  };

  // =====================================================
  // CREATE CARDS
  //
  // API ME JO KEY AAYEGI SIRF WAHI CARD SHOW HOGA.
  //
  // Manager response:
  // myTasks, completedTasks...
  //
  // Isliye User cards automatically hide rahenge.
  // =====================================================

  const cards = Object.entries(data)
    .map(([key, value]) => {
      const config = cardConfig[key];

      if (!config) {
        return null;
      }

      return {
        key,
        title: config.title,
        value,
        icon: config.icon,
        iconBg: config.iconBg,
        iconColor: config.iconColor,
      };
    })
    .filter(Boolean);

  // =====================================================
  // RECENT PROJECTS
  // =====================================================

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700";

      case "In Progress":
        return "bg-blue-50 text-blue-700";

      case "Planning":
        return "bg-amber-50 text-amber-700";

      case "On Hold":
        return "bg-slate-100 text-slate-600";

      case "Cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // =====================================================
  // STAT CARD
  // =====================================================

  const StatCard = ({
    title,
    value,
    icon: Icon,
    iconBg,
    iconColor,
  }) => {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">

        <div className="flex items-start justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              {value}
            </h3>
          </div>

          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
          >
            <Icon size={21} />
          </div>

        </div>

      </div>
    );
  };

  // =====================================================
  // PROJECT STATUS TOTAL
  // =====================================================

  const projectChartTotal =
    activeProjects +
    completedProjects +
    pendingProjects +
    onHoldProjects +
    cancelledProjects;

  // =====================================================
  // PROJECT CHART
  // =====================================================

  const getProjectChart = () => {
    if (projectChartTotal === 0) {
      return {
        background: "conic-gradient(#e2e8f0 0deg 360deg)",
      };
    }

    const activeDeg =
      (activeProjects / projectChartTotal) * 360;

    const completedDeg =
      (completedProjects / projectChartTotal) * 360;

    const pendingDeg =
      (pendingProjects / projectChartTotal) * 360;

    const onHoldDeg =
      (onHoldProjects / projectChartTotal) * 360;

    const activeEnd = activeDeg;

    const completedEnd =
      activeEnd + completedDeg;

    const pendingEnd =
      completedEnd + pendingDeg;

    const onHoldEnd =
      pendingEnd + onHoldDeg;

    return {
      background: `conic-gradient(
        #06b6d4 0deg ${activeEnd}deg,
        #10b981 ${activeEnd}deg ${completedEnd}deg,
        #f59e0b ${completedEnd}deg ${pendingEnd}deg,
        #f43f5e ${pendingEnd}deg ${onHoldEnd}deg,
        #ef4444 ${onHoldEnd}deg 360deg
      )`,
    };
  };

  // =====================================================
  // USER CHART
  // =====================================================

  const userChartTotal =
    totalUsers;

  const userActiveDeg =
    userChartTotal > 0
      ? (activeUsers / userChartTotal) * 360
      : 0;

  const userInactiveDeg =
    userChartTotal > 0
      ? (inactiveUsers / userChartTotal) * 360
      : 0;

  const userChartStyle =
    userChartTotal > 0
      ? {
          background: `conic-gradient(
            #10b981 0deg ${userActiveDeg}deg,
            #94a3b8 ${userActiveDeg}deg ${
              userActiveDeg + userInactiveDeg
            }deg
          )`,
        }
      : {
          background:
            "conic-gradient(#e2e8f0 0deg 360deg)",
        };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-6 pb-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Overview of your current activity
          </p>

        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl">

          <Activity
            size={16}
            className="text-indigo-600"
          />

          <span className="text-sm font-medium text-slate-600 capitalize">
            {dashboardType || "Global"}
          </span>

        </div>

      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      {cards.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {cards.map((card) => (
            <StatCard
              key={card.key}
              title={card.title}
              value={card.value}
              icon={card.icon}
              iconBg={card.iconBg}
              iconColor={card.iconColor}
            />
          ))}

        </div>

      ) : (

        <>

         

        </>

      )}

      {/* =================================================
          USER OVERVIEW + PROJECT STATUS
      ================================================= */}

      <div
        className={`grid grid-cols-1 ${
          hasUserOverview
            ? "xl:grid-cols-2"
            : "xl:grid-cols-1"
        } gap-5`}
      >

        {/* =================================================
            USER OVERVIEW
            ONLY ADMIN / USER DATA API ME HO TO SHOW
        ================================================= */}

        {hasUserOverview && (

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-base font-semibold text-slate-800">
                  User Overview
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Current user activity
                </p>

              </div>

              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

                <Users
                  size={19}
                  className="text-indigo-600"
                />

              </div>

            </div>

            <div className="flex items-center justify-center min-h-[260px]">

              {/* USER DONUT */}

              <div className="relative w-48 h-48 rounded-full p-7"
                style={userChartStyle}
              >

                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">

                  <div className="text-center">

                    <p className="text-3xl font-bold text-slate-800">
                      {totalUsers}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Users
                    </p>

                  </div>

                </div>

              </div>

              {/* USER LEGEND */}

              <div className="ml-8 space-y-5">

                <div className="flex items-center gap-3">

                  <span className="w-3 h-3 rounded-full bg-emerald-500" />

                  <div>

                    <p className="text-sm font-medium text-slate-700">
                      Active Users
                    </p>

                    <p className="text-xs text-slate-400">
                      {activeUsers}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <span className="w-3 h-3 rounded-full bg-slate-400" />

                  <div>

                    <p className="text-sm font-medium text-slate-700">
                      Inactive Users
                    </p>

                    <p className="text-xs text-slate-400">
                      {inactiveUsers}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <span className="w-3 h-3 rounded-full bg-indigo-500" />

                  <div>

                    <p className="text-sm font-medium text-slate-700">
                      Total Managers
                    </p>

                    <p className="text-xs text-slate-400">
                      {totalManagers}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* =================================================
            PROJECT STATUS
        ================================================= */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-base font-semibold text-slate-800">
                Project Status
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Overview of project status
              </p>

            </div>

            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100">

              <MoreHorizontal
                size={18}
                className="text-slate-500"
              />

            </button>

          </div>

          <div className="flex items-center justify-center min-h-[260px]">

            {/* PROJECT DONUT */}

            <div
              className="relative w-48 h-48 rounded-full p-7"
              style={getProjectChart()}
            >

              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">

                <div className="text-center">

                  <p className="text-3xl font-bold text-slate-800">
                    {totalProjects}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Projects
                  </p>

                </div>

              </div>

            </div>

            {/* PROJECT LEGEND */}

            <div className="ml-8 space-y-4">

              <div className="flex items-center gap-3">

                <span className="w-3 h-3 rounded-full bg-cyan-500" />

                <div>

                  <p className="text-sm font-medium text-slate-700">
                    Active
                  </p>

                  <p className="text-xs text-slate-400">
                    {activeProjects}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="w-3 h-3 rounded-full bg-emerald-500" />

                <div>

                  <p className="text-sm font-medium text-slate-700">
                    Completed
                  </p>

                  <p className="text-xs text-slate-400">
                    {completedProjects}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="w-3 h-3 rounded-full bg-amber-500" />

                <div>

                  <p className="text-sm font-medium text-slate-700">
                    Pending
                  </p>

                  <p className="text-xs text-slate-400">
                    {pendingProjects}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="w-3 h-3 rounded-full bg-rose-500" />

                <div>

                  <p className="text-sm font-medium text-slate-700">
                    On Hold
                  </p>

                  <p className="text-xs text-slate-400">
                    {onHoldProjects}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="w-3 h-3 rounded-full bg-red-500" />

                <div>

                  <p className="text-sm font-medium text-slate-700">
                    Cancelled
                  </p>

                  <p className="text-xs text-slate-400">
                    {cancelledProjects}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          PROJECT PROGRESS
      ================================================= */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-base font-semibold text-slate-800">
              Project Progress
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Track overall project performance
            </p>

          </div>

          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
            View All
          </button>

        </div>

        {getProjectsLoading ? (

          <div className="py-10 text-center text-sm text-slate-500">
            Loading projects...
          </div>

        ) : getProjectsError ? (

          <div className="py-10 text-center text-sm text-red-500">
            {getProjectsError}
          </div>

        ) : recentProjects.length === 0 ? (

          <div className="py-10 text-center text-sm text-slate-500">
            No project data available.
          </div>

        ) : (

          <div className="space-y-5">

            {recentProjects.map((project) => {

              const progress = Math.min(
                Math.max(
                  Number(project.progress || 0),
                  0
                ),
                100
              );

              return (

                <div key={project._id}>

                  <div className="flex items-center justify-between mb-2">

                    <div className="min-w-0">

                      <p className="text-sm font-medium text-slate-700 truncate">
                        {project.name}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {project.priority || "Medium"} Priority
                      </p>

                    </div>

                    <span className="text-sm font-semibold text-slate-700 ml-4">
                      {progress}%
                    </span>

                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

      {/* =================================================
          RECENT PROJECTS
      ================================================= */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-100 flex items-center justify-between">

          <div>

            <h2 className="text-base font-semibold text-slate-800">
              Recent Projects
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Latest projects in the system
            </p>

          </div>

          <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">

            View All

            <ArrowUpRight size={14} />

          </button>

        </div>

        {getProjectsLoading ? (

          <div className="p-10 text-center text-sm text-slate-500">
            Loading projects...
          </div>

        ) : getProjectsError ? (

          <div className="p-10 text-center text-sm text-red-500">
            {getProjectsError}
          </div>

        ) : recentProjects.length === 0 ? (

          <div className="p-10 text-center text-sm text-slate-500">
            No projects found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-50 border-b border-slate-100">

                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                    Project
                  </th>

                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                    Manager
                  </th>

                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                    Status
                  </th>

                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                    Progress
                  </th>

                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentProjects.map((project) => {

                  const progress = Math.min(
                    Math.max(
                      Number(project.progress || 0),
                      0
                    ),
                    100
                  );

                  return (

                    <tr
                      key={project._id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                    >

                      {/* PROJECT */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">

                            <FolderKanban
                              size={17}
                              className="text-indigo-600"
                            />

                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-medium text-slate-700 truncate max-w-[220px]">
                              {project.name}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              {project.priority || "Medium"} Priority
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* MANAGER */}

                      <td className="px-5 py-4">

                        <p className="text-sm text-slate-600">
                          {project?.projectManager?.name ||
                            "Not Assigned"}
                        </p>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            project.status
                          )}`}
                        >
                          {project.status || "-"}
                        </span>

                      </td>

                      {/* PROGRESS */}

                      <td className="px-5 py-4">

                        <div className="w-28">

                          <div className="flex items-center justify-between mb-1">

                            <span className="text-[11px] text-slate-400">
                              Progress
                            </span>

                            <span className="text-xs font-semibold text-slate-600">
                              {progress}%
                            </span>

                          </div>

                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">

                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{
                                width: `${progress}%`,
                              }}
                            />

                          </div>

                        </div>

                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4 text-right">

                        <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400">

                          <CalendarDays size={13} />

                          {formatDate(
                            project.createdAt ||
                              project.startDate
                          )}

                        </div>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =================================================
          RECENT ACTIVITY
      ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* PROJECT QUICK OVERVIEW */}

        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-base font-semibold text-slate-800">
                Project Overview
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Quick overview of project timeline
              </p>

            </div>

            <CalendarDays
              size={19}
              className="text-slate-400"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-500">
                Projects Started
              </p>

              <p className="text-2xl font-bold text-slate-800 mt-2">
                {totalProjects}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Total projects currently tracked
              </p>

            </div>

            <div className="rounded-xl bg-cyan-50 p-4">

              <p className="text-xs text-cyan-700">
                Active Work
              </p>

              <p className="text-2xl font-bold text-cyan-700 mt-2">
                {activeProjects}
              </p>

              <p className="text-xs text-cyan-600 mt-1">
                Projects currently in progress
              </p>

            </div>

            <div className="rounded-xl bg-emerald-50 p-4">

              <p className="text-xs text-emerald-700">
                Completed
              </p>

              <p className="text-2xl font-bold text-emerald-700 mt-2">
                {completedProjects}
              </p>

              <p className="text-xs text-emerald-600 mt-1">
                Projects successfully completed
              </p>

            </div>

          </div>

        </div>

        {/* RECENT ACTIVITY */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="p-5 border-b border-slate-100">

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">

                <Activity
                  size={17}
                  className="text-indigo-600"
                />

              </div>

              <div>

                <h2 className="text-base font-semibold text-slate-800">
                  Recent Activity
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Latest system activity
                </p>

              </div>

            </div>

          </div>

          <div className="p-5 space-y-5">

            <div className="flex gap-3">

              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">

                <Users
                  size={15}
                  className="text-indigo-600"
                />

              </div>

              <div>

                <p className="text-sm text-slate-700">
                  User activity
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Latest user activity
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">

                <FolderKanban
                  size={15}
                  className="text-cyan-600"
                />

              </div>

              <div>

                <p className="text-sm text-slate-700">
                  Project activity
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Latest project updates
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">

                <CheckCircle2
                  size={15}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="text-sm text-slate-700">
                  Project completion
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Latest completion updates
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;