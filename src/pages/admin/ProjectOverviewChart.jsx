import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ProjectOverviewChart = ({ projects = [] }) => {
  // =====================================================
  // PROJECT LIST
  // =====================================================

  const projectList = Array.isArray(projects)
    ? projects
    : Array.isArray(projects?.data)
    ? projects.data
    : [];

  // =====================================================
  // STATUS CONFIG
  // =====================================================

  const statusConfig = [
    {
      name: "Planning",
      color: "#3B82F6",
    },
    {
      name: "In Progress",
      color: "#F59E0B",
    },
    {
      name: "Completed",
      color: "#22C55E",
    },
    {
      name: "On Hold",
      color: "#8B5CF6",
    },
    {
      name: "Cancelled",
      color: "#EF4444",
    },
  ];

  // =====================================================
  // STATUS DATA
  // =====================================================

  const statusData = statusConfig.map((status) => ({
    ...status,
    value: projectList.filter(
      (project) => project?.status === status.name
    ).length,
  }));

  // =====================================================
  // TOTAL PROJECTS
  // =====================================================

  const totalProjects = projectList.length;

  // =====================================================
  // PERCENTAGE
  // =====================================================

  const getPercentage = (value) => {
    if (totalProjects === 0) {
      return 0;
    }

    return Math.round((value / totalProjects) * 100);
  };

  // =====================================================
  // TOOLTIP
  // =====================================================

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const data = payload[0].payload;

    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: data.color,
            }}
          />

          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {data.name}
          </span>
        </div>

        <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
          {data.value} Projects
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Project Overview
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Project status overview
        </p>

      </div>

      {/* =================================================
          CHART CONTENT
      ================================================= */}

      <div className="p-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          {/* =================================================
              DONUT
          ================================================= */}

          <div className="relative h-[260px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={96}
                  paddingAngle={4}
                  cornerRadius={6}
                  stroke="none"
                  animationDuration={700}
                >
                  {statusData.map((item) => (
                    <Cell
                      key={item.name}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={false}
                />

              </PieChart>
            </ResponsiveContainer>

            {/* CENTER */}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

              <div className="text-center">

                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalProjects}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Total Projects
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              STATUS LIST
          ================================================= */}

          <div className="space-y-2">

            {statusData.map((item) => {

              const percentage = getPercentage(item.value);

              return (
                <div
                  key={item.name}
                  className="
                    px-3
                    py-2.5
                    rounded-lg
                    hover:bg-gray-50
                    dark:hover:bg-gray-700/30
                    transition
                  "
                >

                  {/* TOP */}

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {item.name}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {percentage}%
                      </span>

                      <span className="text-sm font-bold text-gray-900 dark:text-white min-w-[20px] text-right">
                        {item.value}
                      </span>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="mt-2 h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">

                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectOverviewChart;