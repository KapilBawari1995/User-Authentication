import React, { useEffect } from "react";

import {
  Users,
  FolderKanban,
  CheckCircle2,
  UserCheck,
  Clock3,
  Activity,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getDashboardRequest } from "../../features/dashboard/dashboardSlice";
import { getProjectsRequest } from "../../features/project/projectSlice";

import ProjectOverviewChart from "./ProjectOverviewChart";

const Dashboard = () => {
  const dispatch = useDispatch();

  // =====================================================
  // DASHBOARD STATE
  // =====================================================

  const {
    dashboard,
    getDashboardLoading,
    getDashboardError,
  } = useSelector((state) => state.dashboard);

  // =====================================================
  // PROJECT STATE
  // =====================================================

  const {
    projects,
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
  // FORMAT DASHBOARD LABEL
  // =====================================================

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // =====================================================
  // FIXED DASHBOARD ICONS
  // =====================================================

  const cardIcons = [
    Users,
    FolderKanban,
    CheckCircle2,
    UserCheck,
    Clock3,
    Activity,
  ];

  // =====================================================
  // PROJECT ARRAY
  // =====================================================

  const projectList = Array.isArray(projects)
    ? projects
    : Array.isArray(projects?.data)
    ? projects.data
    : [];

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="space-y-8">

      {/* =================================================
          DASHBOARD CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {getDashboardLoading ? (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Loading dashboard...
            </p>
          </div>
        ) : getDashboardError ? (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-red-500">
              {getDashboardError}
            </p>
          </div>
        ) : (
          Object.entries(dashboard || {}).map(
            ([key, value], index) => {
              const Icon =
                cardIcons[index % cardIcons.length];

              return (
                <div
                  key={key}
                  className="
                    bg-white dark:bg-gray-800
                    rounded-xl
                    p-5
                    shadow-sm
                    border border-gray-100
                    dark:border-gray-700
                  "
                >
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {formatLabel(key)}
                      </p>

                      <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                        {value}
                      </h2>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                      <Icon
                        size={24}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>

                  </div>
                </div>
              );
            }
          )
        )}

      </div>

      {/* =================================================
          PROJECTS
      ================================================= */}

      <div>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Projects
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Your projects
          </p>
        </div>

        {/* LOADING */}

        {getProjectsLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Loading projects...
            </p>
          </div>
        )}

        {/* ERROR */}

        {!getProjectsLoading && getProjectsError && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center border border-red-200 dark:border-red-900">
            <p className="text-red-500">
              {getProjectsError}
            </p>
          </div>
        )}

        {/* NO PROJECT */}

        {!getProjectsLoading &&
          !getProjectsError &&
          projectList.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center border border-gray-100 dark:border-gray-700">

              <div className="flex justify-center mb-3">
                <FolderKanban
                  size={40}
                  className="text-gray-400"
                />
              </div>

              <p className="text-gray-500 dark:text-gray-400">
                No Projects Found
              </p>

            </div>
          )}

        {/* PROJECT LIST */}

        {!getProjectsLoading &&
          !getProjectsError &&
          projectList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {projectList.map((project) => (
                <div
                  key={project._id}
                  className="
                    bg-white dark:bg-gray-800
                    rounded-xl
                    p-5
                    shadow-sm
                    border border-gray-100
                    dark:border-gray-700
                  "
                >

                  {/* PROJECT NAME */}

                  <div className="flex items-start justify-between gap-3">

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>

                    <FolderKanban
                      size={22}
                      className="text-blue-600 dark:text-blue-400 shrink-0"
                    />

                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                    {project.description ||
                      "No description available"}
                  </p>

                  {/* STATUS + PRIORITY */}

                  <div className="flex items-center justify-between mt-5">

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      {project.status || "N/A"}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {project.priority || "N/A"}
                    </span>

                  </div>

                  {/* PROGRESS */}

                  <div className="mt-5">

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Progress
                      </span>

                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {project.progress || 0}%
                      </span>

                    </div>

                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{
                          width: `${project.progress || 0}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* PROJECT MANAGER */}

                  {project.projectManager && (
                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Project Manager
                      </p>

                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {project.projectManager.name}
                      </p>

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

      </div>

      {/* =================================================
          PROJECT OVERVIEW DONUT CHART
      ================================================= */}

      <ProjectOverviewChart projects={projectList} />

    </div>
  );
};

export default Dashboard;