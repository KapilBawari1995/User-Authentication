import React, { useEffect, useMemo, useState } from "react";

import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Users,
  UserCheck,
  ListTodo,
  TrendingUp,
  ChevronDown,
  AlertCircle,
  CircleDot,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";

import { getReportRequest } from "../../features/reports/reportSlice";

// =====================================================
// HELPERS
// =====================================================

const getManagerName = (manager) => {
  if (!manager) return "Not Assigned";

  if (typeof manager === "string") {
    return manager;
  }

  return manager.name || manager.email || "Not Assigned";
};

// =====================================================
// STATUS COLORS
// =====================================================

const projectStatusColors = {
  Completed: "#10b981",
  "In Progress": "#3b82f6",
  Planning: "#8b5cf6",
  "On Hold": "#f59e0b",
  Cancelled: "#ef4444",
};

const taskStatusColors = {
  Completed: "#10b981",
  "In Progress": "#3b82f6",
  Pending: "#f59e0b",
};

// =====================================================
// COMPONENT
// =====================================================

const Reports = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.reports || {}
  );

  const [selectedProject, setSelectedProject] =
    useState("all");

  // =====================================================
  // API CALL
  // =====================================================

  useEffect(() => {
    dispatch(getReportRequest());
  }, [dispatch]);

  // =====================================================
  // ACTUAL API RESPONSE
  // =====================================================

  const reportData = data?.data || {};

  const summary = reportData.summary || {};

  const projects = Array.isArray(reportData.projects)
    ? reportData.projects
    : [];

  const managers = Array.isArray(reportData.managers)
    ? reportData.managers
    : [];

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalProjects =
    summary.totalProjects || 0;

  const completedProjects =
    summary.completedProjects || 0;

  const inProgressProjects =
    summary.inProgressProjects || 0;

  const pendingProjects =
    summary.pendingProjects || 0;

  const totalManagers =
    summary.totalManagers || 0;

  const totalTasks =
    summary.totalTasks || 0;

  const completedTasks =
    summary.completedTasks || 0;

  const inProgressTasks =
    summary.inProgressTasks || 0;

  const pendingTasks =
    summary.pendingTasks || 0;

  // =====================================================
  // PROJECT FILTER
  // =====================================================

  const projectOptions = useMemo(() => {
    return projects.map((project) => ({
      id: project.projectId,
      name: project.projectName,
    }));
  }, [projects]);

  // =====================================================
  // FILTERED PROJECTS
  // =====================================================

  const filteredProjects =
    selectedProject === "all"
      ? projects
      : projects.filter(
          (project) =>
            String(project.projectId) ===
            String(selectedProject)
        );

  // =====================================================
  // PROJECT STATUS CHART
  // =====================================================

  const projectStatusData = [
    {
      name: "Completed",
      value: completedProjects,
    },
    {
      name: "In Progress",
      value: inProgressProjects,
    },
    {
      name: "Pending",
      value: pendingProjects,
    },
  ].filter((item) => item.value > 0);

  // =====================================================
  // TASK STATUS CHART
  // =====================================================

  const taskStatusData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "In Progress",
      value: inProgressTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ].filter((item) => item.value > 0);

  // =====================================================
  // PROJECT TASK CHART
  // =====================================================

  const projectChartData = filteredProjects.map(
    (project) => ({
      name:
        project.projectName?.length > 18
          ? `${project.projectName.substring(0, 18)}...`
          : project.projectName,

      completed: project.completedTasks || 0,

      inProgress:
        project.inProgressTasks || 0,

      pending:
        project.pendingTasks || 0,
    })
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center text-slate-800 dark:text-slate-100">
        <div className="text-center">
          <div
            className="
              w-12 h-12
              border-4
              border-indigo-100 dark:border-indigo-500/20
              border-t-indigo-600 dark:border-t-indigo-400
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Loading reports...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div
        className="
          bg-white dark:bg-slate-900
          border border-red-200 dark:border-red-500/20
          rounded-2xl
          p-8
          text-center
          text-slate-800 dark:text-slate-100
        "
      >
        <AlertCircle
          size={42}
          className="text-red-500 mx-auto"
        />

        <h2 className="text-lg font-bold text-slate-800 dark:text-white mt-4">
          Unable to load reports
        </h2>

        <p className="text-sm text-red-500 dark:text-red-400 mt-2">
          {error}
        </p>

        <button
          onClick={() =>
            dispatch(getReportRequest())
          }
          className="
            mt-5
            px-5 py-2.5
            rounded-xl
            bg-indigo-600
            text-white
            text-sm
            font-semibold
            hover:bg-indigo-700
            transition
          "
        >
          Try Again
        </button>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        "
      >
        <div className="flex items-center gap-4">

          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-600
              text-white
              shadow-lg
              shadow-indigo-200 dark:shadow-none
              flex
              items-center
              justify-center
            "
          >
            <BarChart3 size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Reports & Analytics
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Monitor projects, managers and task performance.
            </p>

          </div>

        </div>

        {/* PROJECT FILTER */}

        <div className="relative">

          <select
            value={selectedProject}
            onChange={(e) =>
              setSelectedProject(e.target.value)
            }
            className="
              appearance-none
              min-w-[240px]
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              rounded-xl
              px-4
              py-3
              pr-10
              text-sm
              font-medium
              text-slate-700 dark:text-slate-200
              outline-none
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/10
            "
          >
            <option value="all">
              All Projects
            </option>

            {projectOptions.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400 dark:text-slate-500
              pointer-events-none
            "
          />

        </div>

      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >

        <SummaryCard
          title="Total Projects"
          value={totalProjects}
          subtitle={`${completedProjects} completed`}
          icon={<FolderKanban size={23} />}
          iconClass="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        />

        <SummaryCard
          title="In Progress"
          value={inProgressProjects}
          subtitle={`${pendingProjects} pending`}
          icon={<Clock3 size={23} />}
          iconClass="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />

        <SummaryCard
          title="Project Managers"
          value={totalManagers}
          subtitle="Managing projects"
          icon={<UserCheck size={23} />}
          iconClass="bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
        />

        <SummaryCard
          title="Total Tasks"
          value={totalTasks}
          subtitle={`${completedTasks} completed`}
          icon={<ListTodo size={23} />}
          iconClass="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />

      </div>

      {/* =====================================================
          SECONDARY TASK CARDS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-5
        "
      >

        <MiniCard
          title="Completed Tasks"
          value={completedTasks}
          icon={<CheckCircle2 size={20} />}
          className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
        />

        <MiniCard
          title="In Progress Tasks"
          value={inProgressTasks}
          icon={<TrendingUp size={20} />}
          className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
        />

        <MiniCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={<CircleDot size={20} />}
          className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10"
        />

      </div>

      {/* =====================================================
          CHARTS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >

        {/* PROJECT STATUS */}

        <ChartCard
          title="Project Status"
          subtitle="Current project distribution"
        >
          {projectStatusData.length > 0 ? (
            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={projectStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={4}
                  >
                    {projectStatusData.map(
                      (item) => (
                        <Cell
                          key={item.name}
                          fill={
                            projectStatusColors[
                              item.name
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>
          ) : (
            <EmptyChart />
          )}
        </ChartCard>

        {/* TASK STATUS */}

        <ChartCard
          title="Task Status"
          subtitle="Overall task distribution"
        >
          {taskStatusData.length > 0 ? (
            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={taskStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={4}
                  >
                    {taskStatusData.map(
                      (item) => (
                        <Cell
                          key={item.name}
                          fill={
                            taskStatusColors[
                              item.name
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>
          ) : (
            <EmptyChart />
          )}
        </ChartCard>

      </div>

      {/* =====================================================
          PROJECT TASK CHART
      ===================================================== */}

      <ChartCard
        title="Project Task Performance"
        subtitle="Completed, in-progress and pending tasks by project"
        icon={<TrendingUp size={20} className="text-indigo-500 dark:text-indigo-400" />}
      >
        {projectChartData.length > 0 ? (
          <div className="h-[380px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={projectChartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 12,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="inProgress"
                  name="In Progress"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        ) : (
          <EmptyChart />
        )}
      </ChartCard>

      {/* =====================================================
          MANAGER PERFORMANCE
      ===================================================== */}

      <div
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          shadow-sm dark:shadow-none
          overflow-hidden
        "
      >

        <div
          className="
            px-6 py-5
            border-b border-slate-200 dark:border-slate-700
            flex items-center justify-between
          "
        >

          <div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Manager Performance
            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Project and task performance by manager
            </p>

          </div>

          <Users
            size={21}
            className="text-violet-500 dark:text-violet-400"
          />

        </div>

        {managers.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  className="
                    bg-slate-50 dark:bg-slate-800/70
                    border-b border-slate-200 dark:border-slate-700
                  "
                >

                  <TableHead>
                    Manager
                  </TableHead>

                  <TableHead center>
                    Projects
                  </TableHead>

                  <TableHead center>
                    Completed Projects
                  </TableHead>

                  <TableHead center>
                    Total Tasks
                  </TableHead>

                  <TableHead center>
                    Completed Tasks
                  </TableHead>

                  <TableHead center>
                    Completion
                  </TableHead>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                {managers.map(
                  (manager, index) => {

                    const completionRate =
                      manager.completionRate || 0;

                    return (
                      <tr
                        key={
                          manager.managerId ||
                          index
                        }
                        className="
                          border-b border-slate-100 dark:border-slate-800
                          hover:bg-slate-50 dark:hover:bg-slate-800/60
                          transition
                        "
                      >

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                w-10 h-10
                                rounded-xl
                                bg-violet-50 dark:bg-violet-500/10
                                text-violet-600 dark:text-violet-400
                                flex items-center
                                justify-center
                                font-bold
                              "
                            >
                              {(
                                manager.managerName ||
                                "M"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <p className="font-semibold text-slate-800 dark:text-slate-100">
                                {manager.managerName ||
                                  "Unknown Manager"}
                              </p>

                              <p className="text-xs text-slate-400 dark:text-slate-500">
                                {manager.email || ""}
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {manager.totalProjects || 0}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1
                              px-2.5
                              py-1
                              rounded-lg
                              bg-emerald-50 dark:bg-emerald-500/10
                              text-emerald-600 dark:text-emerald-400
                              text-xs
                              font-bold
                            "
                          >
                            <CheckCircle2 size={13} />
                            {manager.completedProjects || 0}
                          </span>

                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {manager.totalTasks || 0}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1
                              px-2.5
                              py-1
                              rounded-lg
                              bg-blue-50 dark:bg-blue-500/10
                              text-blue-600 dark:text-blue-400
                              text-xs
                              font-bold
                            "
                          >
                            <CheckCircle2 size={13} />
                            {manager.completedTasks || 0}
                          </span>

                        </td>

                        <td className="px-6 py-4">

                          <div className="min-w-[140px]">

                            <div className="flex justify-between mb-1">

                              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                {completionRate}%
                              </span>

                            </div>

                            <div
                              className="
                                h-2
                                bg-slate-100 dark:bg-slate-800
                                rounded-full
                                overflow-hidden
                              "
                            >

                              <div
                                className="
                                  h-full
                                  bg-violet-600
                                  rounded-full
                                  transition-all
                                "
                                style={{
                                  width: `${Math.min(
                                    completionRate,
                                    100
                                  )}%`,
                                }}
                              />

                            </div>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        ) : (
          <EmptyTable
            icon={<Users size={40} />}
            text="No manager performance data available"
          />
        )}

      </div>

      {/* =====================================================
          PROJECT PERFORMANCE TABLE
      ===================================================== */}

      <div
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          shadow-sm dark:shadow-none
          overflow-hidden
        "
      >

        <div
          className="
            px-6 py-5
            border-b border-slate-200 dark:border-slate-700
          "
        >

          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Project Performance
          </h2>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Detailed project-wise report
          </p>

        </div>

        {filteredProjects.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  className="
                    bg-slate-50 dark:bg-slate-800/70
                    border-b border-slate-200 dark:border-slate-700
                  "
                >

                  <TableHead>
                    Project
                  </TableHead>

                  <TableHead>
                    Manager
                  </TableHead>

                  <TableHead center>
                    Status
                  </TableHead>

                  <TableHead center>
                    Priority
                  </TableHead>

                  <TableHead center>
                    Tasks
                  </TableHead>

                  <TableHead center>
                    Completed
                  </TableHead>

                  <TableHead center>
                    Progress
                  </TableHead>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                {filteredProjects.map(
                  (project) => {

                    const progress =
                      project.progress || 0;

                    return (
                      <tr
                        key={project.projectId}
                        className="
                          border-b border-slate-100 dark:border-slate-800
                          hover:bg-slate-50 dark:hover:bg-slate-800/60
                          transition
                        "
                      >

                        {/* PROJECT */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                w-10 h-10
                                rounded-xl
                                bg-indigo-50 dark:bg-indigo-500/10
                                text-indigo-600 dark:text-indigo-400
                                flex items-center
                                justify-center
                              "
                            >
                              <BriefcaseBusiness
                                size={18}
                              />
                            </div>

                            <div>

                              <p className="font-semibold text-slate-800 dark:text-slate-100">
                                {project.projectName}
                              </p>

                              <p className="text-xs text-slate-400 dark:text-slate-500">

                                {project.startDate
                                  ? new Date(
                                      project.startDate
                                    ).toLocaleDateString()
                                  : "-"}

                                {" → "}

                                {project.endDate
                                  ? new Date(
                                      project.endDate
                                    ).toLocaleDateString()
                                  : "-"}

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* MANAGER */}

                        <td className="px-6 py-4">

                          <div>

                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {getManagerName(
                                project.manager
                              )}
                            </p>

                            {project.manager?.email && (
                              <p className="text-xs text-slate-400 dark:text-slate-500">
                                {project.manager.email}
                              </p>
                            )}

                          </div>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4 text-center">

                          <span
                            className={`
                              inline-flex
                              px-3
                              py-1.5
                              rounded-lg
                              text-xs
                              font-bold
                              ${
                                project.status ===
                                "Completed"
                                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : project.status ===
                                    "In Progress"
                                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                  : project.status ===
                                    "On Hold"
                                  ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                              }
                            `}
                          >
                            {project.status}
                          </span>

                        </td>

                        {/* PRIORITY */}

                        <td className="px-6 py-4 text-center">

                          <span
                            className={`
                              inline-flex
                              px-3
                              py-1.5
                              rounded-lg
                              text-xs
                              font-bold
                              ${
                                project.priority ===
                                "Critical"
                                  ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                                  : project.priority ===
                                    "High"
                                  ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                  : project.priority ===
                                    "Medium"
                                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                              }
                            `}
                          >
                            {project.priority}
                          </span>

                        </td>

                        {/* TASKS */}

                        <td className="px-6 py-4 text-center">

                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {project.totalTasks || 0}
                          </span>

                        </td>

                        {/* COMPLETED */}

                        <td className="px-6 py-4 text-center">

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1
                              px-2.5
                              py-1
                              rounded-lg
                              bg-emerald-50 dark:bg-emerald-500/10
                              text-emerald-600 dark:text-emerald-400
                              text-xs
                              font-bold
                            "
                          >
                            <CheckCircle2 size={13} />

                            {project.completedTasks || 0}

                          </span>

                        </td>

                        {/* PROGRESS */}

                        <td className="px-6 py-4">

                          <div className="min-w-[130px]">

                            <div className="flex justify-between mb-1">

                              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                {progress}%
                              </span>

                            </div>

                            <div
                              className="
                                h-2
                                bg-slate-100 dark:bg-slate-800
                                rounded-full
                                overflow-hidden
                              "
                            >

                              <div
                                className="
                                  h-full
                                  bg-indigo-600
                                  rounded-full
                                  transition-all
                                "
                                style={{
                                  width: `${Math.min(
                                    progress,
                                    100
                                  )}%`,
                                }}
                              />

                            </div>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        ) : (
          <EmptyTable
            icon={<FolderKanban size={40} />}
            text="No project report available"
          />
        )}

      </div>

    </div>
  );
};

// =====================================================
// SUMMARY CARD
// =====================================================

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        rounded-2xl
        border border-slate-200 dark:border-slate-700
        p-5
        shadow-sm dark:shadow-none
        hover:shadow-md dark:hover:bg-slate-800
        transition
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
            {value}
          </h2>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {subtitle}
          </p>

        </div>

        <div
          className={`
            w-12 h-12
            rounded-xl
            flex
            items-center
            justify-center
            ${iconClass}
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

// =====================================================
// MINI CARD
// =====================================================

const MiniCard = ({
  title,
  value,
  icon,
  className,
}) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        rounded-2xl
        border border-slate-200 dark:border-slate-700
        p-5
        flex
        items-center
        justify-between
      "
    >

      <div>

        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {title}
        </p>

        <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
          {value}
        </p>

      </div>

      <div
        className={`
          w-11 h-11
          rounded-xl
          flex
          items-center
          justify-center
          ${className}
        `}
      >
        {icon}
      </div>

    </div>
  );
};

// =====================================================
// CHART CARD
// =====================================================

const ChartCard = ({
  title,
  subtitle,
  children,
  icon,
}) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        rounded-2xl
        border border-slate-200 dark:border-slate-700
        shadow-sm dark:shadow-none
        p-6
      "
    >

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {title}
          </h2>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {subtitle}
          </p>

        </div>

        {icon}

      </div>

      {children}

    </div>
  );
};

// =====================================================
// TABLE HEAD
// =====================================================

const TableHead = ({
  children,
  center = false,
}) => {
  return (
    <th
      className={`
        px-6
        py-4
        text-xs
        font-bold
        text-slate-500 dark:text-slate-400
        uppercase
        ${
          center
            ? "text-center"
            : "text-left"
        }
      `}
    >
      {children}
    </th>
  );
};

// =====================================================
// EMPTY CHART
// =====================================================

const EmptyChart = () => {
  return (
    <div className="h-[300px] flex items-center justify-center">

      <div className="text-center">

        <BarChart3
          size={42}
          className="mx-auto text-slate-300 dark:text-slate-700"
        />

        <p className="text-sm text-slate-400 dark:text-slate-500 mt-3">
          No data available
        </p>

      </div>

    </div>
  );
};

// =====================================================
// EMPTY TABLE
// =====================================================

const EmptyTable = ({
  icon,
  text,
}) => {
  return (
    <div className="py-14 text-center">

      <div className="text-slate-300 dark:text-slate-700 flex justify-center">
        {icon}
      </div>

      <p className="text-sm text-slate-400 dark:text-slate-500 mt-3">
        {text}
      </p>

    </div>
  );
};

export default Reports;