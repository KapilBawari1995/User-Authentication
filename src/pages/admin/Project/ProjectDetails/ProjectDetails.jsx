import React, { useEffect } from "react";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProjectByIdRequest,
} from "../../../../features/project/projectSlice";

import TeamMembersTask from "../../Tasks/TeamMembersTask";
import Tasks from "../../Tasks/Tasks";

import ProjectDetailsHeader from "./components/ProjectDetailsHeader";
import ProjectLoading from "./components/ProjectLoading";
import ProjectError from "./components/ProjectError";


import usePermissions from "../../../../hooks/usePermissions";


const ProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectId } = useParams();

  const {
    project,
    getProjectLoading,
    getProjectError,
  } = useSelector((state) => state.project);

   const {
    canAddMember
  } = usePermissions("projects");


  useEffect(() => {
    if (projectId) {
      dispatch(getProjectByIdRequest(projectId));
    }
  }, [dispatch, projectId]);

  if (getProjectLoading) {
    return <ProjectLoading />;
  }

  if (getProjectError) {
    return (
      <ProjectError
        error={getProjectError}
        onBack={() => navigate("/admin/projects")}
      />
    );
  }

  if (!project) {
    return null;
  }

  const teamMembers = project?.teamMembers || [];

  return (
    <div>
      {/* BACK BUTTON */}
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

       <TeamMembersTask
        teamMembers={teamMembers}
                canAddMember={canAddMember}

        projectId={project._id}
      />

      <ProjectDetailsHeader
        project={project}
        onAddTask={() =>
          navigate(
            `/admin/projects/${project._id}/tasks/create`
          )
        }
      />

   
      <Tasks projectId={project._id} />
    </div>
  );
};

export default ProjectDetails;