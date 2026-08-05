import React, { useEffect, useMemo, useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getProjectsRequest,
  deleteProjectRequest,
} from "../../../features/project/projectSlice";

const Projects = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    projects,
    totalCount,
    getProjectsLoading,
  } = useSelector(
    (state) => state.project
  );

  const [search, setSearch] = useState("");

  useEffect(() => {

    dispatch(
      getProjectsRequest({
        page: 1,
        pageSize: 20,
        search,
      })
    );

  }, [dispatch, search]);



  // ================= Stats =================

  const activeProjects = useMemo(() => {

    return projects.filter(
      (item) =>
        item.status === "Planning" ||
        item.status === "In Progress"
    ).length;

  }, [projects]);



  const completedProjects = useMemo(() => {

    return projects.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  }, [projects]);



  const totalMembers = useMemo(() => {

    let members = 0;

    projects.forEach((item) => {
      members += item.teamMembers?.length || 0;
    });

    return members;

  }, [projects]);



  const handleDelete = (id) => {

    if (
      window.confirm(
        "Delete this project?"
      )
    ) {

      dispatch(
        deleteProjectRequest(id)
      );

    }

  };



  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Projects
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all company projects.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/projects/add")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
          >

            <Plus size={18} />

            New Project

          </button>

        </div>



        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow p-6">

            <FolderKanban
              className="text-blue-600 mb-4"
            />

            <h2 className="text-3xl font-bold">
              {totalCount}
            </h2>

            <p className="text-gray-500">
              Total Projects
            </p>

          </div>



          <div className="bg-white rounded-xl shadow p-6">

            <Clock
              className="text-orange-500 mb-4"
            />

            <h2 className="text-3xl font-bold">
              {activeProjects}
            </h2>

            <p className="text-gray-500">
              Active Projects
            </p>

          </div>



          <div className="bg-white rounded-xl shadow p-6">

            <CheckCircle
              className="text-green-600 mb-4"
            />

            <h2 className="text-3xl font-bold">
              {completedProjects}
            </h2>

            <p className="text-gray-500">
              Completed
            </p>

          </div>



          <div className="bg-white rounded-xl shadow p-6">

            <Users
              className="text-purple-600 mb-4"
            />

            <h2 className="text-3xl font-bold">
              {totalMembers}
            </h2>

            <p className="text-gray-500">
              Team Members
            </p>

          </div>

        </div>



        {/* Search */}

        <div className="bg-white rounded-xl shadow p-4 mb-8">

          <div className="flex items-center gap-3">

            <Search
              className="text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Project..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full outline-none"
            />

          </div>

        </div>

                {/* Projects List */}

        {getProjectsLoading ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-lg font-semibold">
              Loading Projects...
            </h2>

          </div>

        ) : projects.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <FolderKanban
              size={60}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-xl font-semibold">
              No Projects Found
            </h2>

            <p className="text-gray-500 mt-2">
              Click on "New Project" to create your first project.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {projects.map((project) => {

              const totalTeam =
                project.teamMembers?.length || 0;

              const progress =
                project.status === "Completed"
                  ? 100
                  : project.status === "In Progress"
                  ? 60
                  : project.status === "Planning"
                  ? 20
                  : 0;

              return (

                <div
                  key={project._id}
                  className="bg-white rounded-xl shadow p-6"
                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-xl font-bold">

                        {project.name}

                      </h2>

                      <p className="text-gray-500 mt-2">

                        {project.description}

                      </p>

                    </div>

                  </div>

                  {/* Project Info */}

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div>

                      <p className="text-gray-500 text-sm">
                        Manager
                      </p>

                      <h4 className="font-semibold">

                        {project.projectManager?.name}

                      </h4>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Members
                      </p>

                      <h4 className="font-semibold">

                        {totalTeam}

                      </h4>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Priority
                      </p>

                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">

                        {project.priority}

                      </span>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Status
                      </p>

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                        {project.status}

                      </span>

                    </div>

                  </div>

                  {/* Dates */}

                  <div className="mt-5 flex justify-between text-sm text-gray-500">

                    <span>

                      Start :
                      {" "}
                      {new Date(
                        project.startDate
                      ).toLocaleDateString()}

                    </span>

                    <span>

                      End :
                      {" "}
                      {new Date(
                        project.endDate
                      ).toLocaleDateString()}

                    </span>

                  </div>

                  {/* Progress */}

                  <div className="mt-5">

                    <div className="flex justify-between text-sm mb-2">

                      <span>
                        Progress
                      </span>

                      <span>

                        {progress}%

                      </span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">

                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Budget */}

                  <div className="mt-5">

                    <span className="font-semibold">

                      Budget :

                    </span>

                    ₹ {project.budget}

                  </div>

                  {/* Actions */}

                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() =>
                        navigate(
                          `/projects/view/${project._id}`
                        )
                      }
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/projects/edit/${project._id}`
                        )
                      }
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(project._id)
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

};

export default Projects;