import React, { useEffect, useState } from "react";
import { FolderKanban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProjectsRequest,
} from "../../../features/project/projectSlice";

import { hasPermission } from "../../../utils/permissionUtils";

import ProjectHeader from "./components/ProjectHeader";
import ProjectSummary from "./components/ProjectSummary";
import ProjectFilters from "./components/ProjectFilters";
import ProjectCard from "./components/ProjectCard";
import ProjectLoading from "./components/ProjectLoading";
import ProjectError from "./components/ProjectError";
import ProjectEmptyState from "./components/ProjectEmptyState";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const {
    projects = [],
    totalCount = 0,
    getProjectsLoading,
    getProjectsError,
  } = useSelector((state) => state.project);

  const user = useSelector((state) => state.auth?.user);

  const permissions = user?.role?.permissions || [];
  const isSuperAdmin = Boolean(user?.isSuperAdmin);

  const canView =
    isSuperAdmin ||
    hasPermission(permissions, "Projects", "view");

  const canCreate =
    isSuperAdmin ||
    hasPermission(permissions, "Projects", "create");

  const canEdit =
    isSuperAdmin ||
    hasPermission(permissions, "Projects", "edit");
  const canDelete =
    isSuperAdmin ||
    hasPermission(
      permissions,
      "Projects",
      "delete"
    );

  // =====================================================
  // GET PROJECTS
  // =====================================================

  useEffect(() => {
    if (!canView) return;

    const timer = setTimeout(() => {
      dispatch(
        getProjectsRequest({
          page: 1,
          pageSize: 100,
          search: search.trim(),
          status:
            statusFilter === "All"
              ? ""
              : statusFilter,
          priority:
            priorityFilter === "All"
              ? ""
              : priorityFilter,
        })
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [
    search,
    statusFilter,
    priorityFilter,
    dispatch,
    canView,
  ]);

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = (id) => {
    if (!canView) return;

    navigate(`/admin/projects/${id}`);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (id) => {
    if (!canEdit) return;

    navigate(`/admin/projects/edit/${id}`);
  };

  // =====================================================
  // ACCESS DENIED
  // =====================================================

  if (!canView) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
        <FolderKanban
          size={45}
          className="mx-auto text-slate-300 mb-3"
        />

        <h3 className="font-semibold text-slate-700">
          Access Denied
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          You do not have permission to view projects.
        </p>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div>
      <ProjectHeader
        canCreate={canCreate}
        onAdd={() =>
          navigate("/admin/projects/add")
        }
      />

      <ProjectSummary
        projects={projects}
        totalCount={totalCount}
      />
<ProjectFilters
  search={search}
  setSearch={setSearch}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  priorityFilter={priorityFilter}
  setPriorityFilter={setPriorityFilter}
/>

      {getProjectsLoading && <ProjectLoading />}

      {!getProjectsLoading && getProjectsError && (
        <ProjectError error={getProjectsError} />
      )}

      {!getProjectsLoading &&
        !getProjectsError && (
          <div className="space-y-4">
            {projects.length === 0 ? (
              <ProjectEmptyState />
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  canView={canView}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  onView={handleView}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        )}
    </div>
  );
};

export default Projects;