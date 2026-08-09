
import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CalendarDays,
  Users,
  Building2,
  FolderKanban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProjectsRequest,
  deleteProjectRequest,
} from "../../../features/project/projectSlice";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= STATE =================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // ================= REDUX =================

  const {
    projects = [],
    totalCount = 0,
    getProjectsLoading,
    getProjectsError,
    deleteProjectLoading,
  } = useSelector((state) => state.project);

  // ================= GET PROJECTS =================



  // ================= SEARCH / FILTER =================

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getProjectsRequest({
          page: 1,
          pageSize: 100,
          search: search.trim(),
        })
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  // ================= FILTER =================

  const filteredProjects = projects.filter((project) => {
    const managerName =
      project?.projectManager?.name || "";

    const managerEmail =
      project?.projectManager?.email || "";

    const departmentName =
      project?.department?.name ||
      project?.department ||
      "";

    const matchesSearch =
      project?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      managerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      managerEmail
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      departmentName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      project.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      project.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  // ================= STATUS STYLE =================

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
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  // ================= PRIORITY STYLE =================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
        return "text-red-600";

      case "High":
        return "text-orange-600";

      case "Medium":
        return "text-yellow-600";

      case "Low":
        return "text-emerald-600";

      default:
        return "text-gray-600";
    }
  };

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    dispatch(deleteProjectRequest(id));
  };

  // ================= VIEW =================

  const handleView = (id) => {
    navigate(`/admin/projects/${id}`);
  };

  // ================= EDIT =================

  const handleEdit = (id) => {
    navigate(`/admin/projects/edit/${id}`);
  };

  return (
    <div>

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

        <div>
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FolderKanban size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Projects
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage and track all your projects.
              </p>
            </div>

          </div>
        </div>

        <button
           onClick={() => navigate("/admin/projects/add")}

          className="
            flex items-center justify-center gap-2
            bg-indigo-600 hover:bg-indigo-700
            text-white px-5 py-3 rounded-xl
            font-semibold shadow-sm transition
          "
        >
          <Plus size={19} />
          Add Project
        </button>

      </div>


      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

        {/* TOTAL */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Projects
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-2">
            {totalCount || projects.length}
          </h3>

        </div>


        {/* IN PROGRESS */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <h3 className="text-2xl font-bold text-blue-600 mt-2">
            {
              projects.filter(
                (project) =>
                  project.status === "In Progress"
              ).length
            }
          </h3>

        </div>


        {/* COMPLETED */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h3 className="text-2xl font-bold text-emerald-600 mt-2">
            {
              projects.filter(
                (project) =>
                  project.status === "Completed"
              ).length
            }
          </h3>

        </div>


        {/* ON HOLD */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            On Hold
          </p>

          <h3 className="text-2xl font-bold text-slate-600 mt-2">
            {
              projects.filter(
                (project) =>
                  project.status === "On Hold"
              ).length
            }
          </h3>

        </div>

      </div>


      {/* ================= FILTER BAR ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search project, manager or department..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full pl-11 pr-4 py-3
                border border-slate-300
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:border-indigo-500
              "
            />

          </div>


          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              px-4 py-3
              border border-slate-300
              rounded-xl
              bg-white
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          >

            <option value="All">
              All Status
            </option>

            <option value="Planning">
              Planning
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="On Hold">
              On Hold
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>


          {/* PRIORITY */}

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="
              px-4 py-3
              border border-slate-300
              rounded-xl
              bg-white
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          >

            <option value="All">
              All Priority
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>

      </div>


      {/* ================= LOADING ================= */}

      {getProjectsLoading && (

        <div className="
          bg-white
          border border-slate-200
          rounded-2xl
          p-12
          text-center
        ">

          <p className="text-slate-500">
            Loading projects...
          </p>

        </div>

      )}


      {/* ================= ERROR ================= */}

      {!getProjectsLoading &&
        getProjectsError && (

          <div className="
            bg-red-50
            border border-red-200
            rounded-2xl
            p-5
            mb-5
          ">

            <p className="text-red-600 font-medium">
              {getProjectsError}
            </p>

          </div>

        )}


      {/* ================= PROJECT LIST ================= */}

      {!getProjectsLoading && !getProjectsError && (

        <div className="space-y-4">

          {filteredProjects.length === 0 ? (

            <div className="
              bg-white
              border border-slate-200
              rounded-2xl
              p-12
              text-center
            ">

              <FolderKanban
                size={45}
                className="
                  mx-auto
                  text-slate-300
                  mb-3
                "
              />

              <h3 className="font-semibold text-slate-700">
                No projects found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Try changing your search or filters.
              </p>

            </div>

          ) : (

            filteredProjects.map((project) => {

              const managerName =
                project?.projectManager?.name ||
                "Not Assigned";

              const managerEmail =
                project?.projectManager?.email ||
                "";

              const departmentName =
                project?.department?.name ||
                project?.department ||
                "Not Available";

              return (

                <div
                  key={project._id}
                  className="
                    bg-white
                    border border-slate-200
                    rounded-2xl
                    p-5
                    shadow-sm
                    hover:shadow-md
                    transition
                  "
                >

                  {/* ================= TOP ================= */}

                  <div className="
                    flex flex-col
                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                    gap-4
                  ">

                    <div className="flex gap-4">

                      <div className="
                        w-12 h-12
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                        flex items-center
                        justify-center
                        shrink-0
                      ">
                        <FolderKanban size={22} />
                      </div>

                      <div>

                        <h2 className="
                          text-lg
                          font-bold
                          text-slate-800
                        ">
                          {project.name}
                        </h2>

                        <p className="
                          text-sm
                          text-slate-500
                          mt-1
                          max-w-2xl
                        ">
                          {project.description ||
                            "No description available."}
                        </p>

                      </div>

                    </div>


                    {/* ================= ACTIONS ================= */}

                    <div className="
                      flex items-center gap-2
                    ">

                      {/* VIEW */}

                      <button
                        onClick={() =>
                          handleView(project._id)
                        }
                        className="
                          w-9 h-9
                          rounded-lg
                          border border-slate-200
                          flex items-center
                          justify-center
                          text-slate-500
                          hover:bg-slate-50
                        "
                        title="View"
                      >
                        <Eye size={17} />
                      </button>


                      {/* EDIT */}

                      <button
                        onClick={() =>
                          handleEdit(project._id)
                        }
                        className="
                          w-9 h-9
                          rounded-lg
                          border border-slate-200
                          flex items-center
                          justify-center
                          text-slate-500
                          hover:bg-slate-50
                        "
                        title="Edit"
                      >
                        <Edit size={17} />
                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() =>
                          handleDelete(project._id)
                        }
                        disabled={deleteProjectLoading}
                        className="
                          w-9 h-9
                          rounded-lg
                          border border-red-100
                          flex items-center
                          justify-center
                          text-red-500
                          hover:bg-red-50
                          disabled:opacity-50
                        "
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>


                      {/* MORE */}

                      <button
                        className="
                          w-9 h-9
                          rounded-lg
                          border border-slate-200
                          flex items-center
                          justify-center
                          text-slate-500
                          hover:bg-slate-50
                        "
                        title="More"
                      >
                        <MoreVertical size={17} />
                      </button>

                    </div>

                  </div>


                  {/* ================= DETAILS ================= */}

                  <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-4
                    mt-6
                    pt-5
                    border-t
                    border-slate-100
                  ">

                    {/* DEPARTMENT */}

                    <div className="
                      flex items-center gap-3
                    ">

                      <Building2
                        size={18}
                        className="text-slate-400"
                      />

                      <div>

                        <p className="
                          text-xs
                          text-slate-400
                        ">
                          Department
                        </p>

                        <p className="
                          text-sm
                          font-semibold
                          text-slate-700
                        ">
                          {departmentName}
                        </p>

                      </div>

                    </div>


                    {/* MANAGER */}

                    <div className="
                      flex items-center gap-3
                    ">

                      <Users
                        size={18}
                        className="text-slate-400"
                      />

                      <div>

                        <p className="
                          text-xs
                          text-slate-400
                        ">
                          Manager
                        </p>

                        <p className="
                          text-sm
                          font-semibold
                          text-slate-700
                        ">
                          {managerName}
                        </p>

                        {managerEmail && (
                          <p className="
                            text-xs
                            text-slate-400
                            mt-0.5
                          ">
                            {managerEmail}
                          </p>
                        )}

                      </div>

                    </div>


                    {/* TIMELINE */}

                    <div className="
                      flex items-center gap-3
                    ">

                      <CalendarDays
                        size={18}
                        className="text-slate-400"
                      />

                      <div>

                        <p className="
                          text-xs
                          text-slate-400
                        ">
                          Timeline
                        </p>

                        <p className="
                          text-sm
                          font-semibold
                          text-slate-700
                        ">
                          {formatDate(project.startDate)}
                          {" → "}
                          {formatDate(project.endDate)}
                        </p>

                      </div>

                    </div>


                    {/* PRIORITY */}

                    <div>

                      <p className="
                        text-xs
                        text-slate-400
                        mb-1
                      ">
                        Priority
                      </p>

                      <p
                        className={`
                          text-sm
                          font-bold
                          ${getPriorityStyle(
                            project.priority
                          )}
                        `}
                      >
                        {project.priority || "Medium"}
                      </p>

                    </div>

                  </div>


                  {/* ================= BOTTOM ================= */}

                  <div className="
                    mt-5
                    pt-5
                    border-t
                    border-slate-100
                  ">

                    <div className="
                      flex
                      items-center
                      justify-between
                      mb-2
                    ">

                      <div className="
                        flex
                        items-center
                        gap-3
                      ">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            border
                            ${getStatusStyle(
                              project.status
                            )}
                          `}
                        >
                          {project.status || "Planning"}
                        </span>

                        <span className="
                          text-sm
                          text-slate-500
                        ">
                          Project Progress
                        </span>

                      </div>

                      <span className="
                        text-sm
                        font-bold
                        text-slate-700
                      ">
                        {project.progress || 0}%
                      </span>

                    </div>


                    {/* PROGRESS BAR */}

                    <div className="
                      w-full
                      h-2
                      bg-slate-100
                      rounded-full
                      overflow-hidden
                    ">

                      <div
                        className="
                          h-full
                          bg-indigo-600
                          rounded-full
                          transition-all
                        "
                        style={{
                          width: `${project.progress || 0}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              );
            })

          )}

        </div>

      )}

    </div>
  );
};

export default Projects;
