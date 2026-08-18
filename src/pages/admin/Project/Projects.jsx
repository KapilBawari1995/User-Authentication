import React, { useEffect, useState } from "react";
import { FolderKanban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import {
  getProjectsRequest,
} from "../../../features/project/projectSlice";

import usePermissions from "../../../hooks/usePermissions";

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
const debouncedSearch = useDebounce(search, 600);

 
  const {
    canView,
    canCreate,
    canEdit,
    canDelete,
  } = usePermissions("projects");


  const {
    projects = [],
    totalCount = 0,
    getProjectsLoading,
    getProjectsError,
  } = useSelector((state) => state.project);

  
useEffect(() => {
  dispatch(
    getProjectsRequest({
      page: 1,
      pageSize: 100,
      search: debouncedSearch.trim(),
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
}, [
  dispatch,
  debouncedSearch,
  statusFilter,
  priorityFilter,
]);


  const handleView = (id) => {
    navigate(`/admin/projects/view/${id}`);
  };

 
  const handleEdit = (id) => {
    navigate(`/admin/projects/edit/${id}`);
  };

  return (
    <div>
     
      <ProjectHeader
        canCreate={canCreate}
        onAdd={() => {
          navigate("/admin/projects/add");
        }}
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


      {!getProjectsLoading && !getProjectsError && (
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