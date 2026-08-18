import React, { useEffect } from "react";
import {
  ArrowLeft,
  FolderKanban,
  Users,
  Building2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  getDepartmentsRequest,
  getDepartmentManagersRequest,
} from "../../../features/department/departmentSlice";

import {
  createProjectRequest,
  getProjectByIdRequest,
  updateProjectRequest,
  clearProjectState,
} from "../../../features/project/projectSlice";

const AddProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    departments = [],
    managers = [],
    getDepartmentsLoading,
    managersLoading,
  } = useSelector((state) => state.department || {});

  const {
    project,
    createLoading,
    createProjectSuccess,
    createError,
    updateLoading,
    updateProjectSuccess,
    updateError,
    getProjectByIdLoading,
  } = useSelector((state) => state.project || {});

  const submitting = createLoading || updateLoading;
  const apiError = id ? updateError : createError;

  useEffect(() => {
    dispatch(getDepartmentsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getProjectByIdRequest(id));
    }
  }, [dispatch, id]);

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Project name is required"),
    description: Yup.string().trim().required("Description is required"),
    department: Yup.string().required("Please select department"),
    projectManager: Yup.string().required("Please select manager"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    priority: Yup.string().required("Please select priority"),
    status: Yup.string().required("Please select status"),
    budget: Yup.number()
      .typeError("Budget must be a number")
      .min(0, "Budget cannot be negative")
      .required("Budget is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      department: "",
      projectManager: "",
      startDate: "",
      endDate: "",
      priority: "Medium",
      status: "Planning",
      budget: "",
    },

    validationSchema,

    onSubmit: (values) => {
      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        department: values.department,
        projectManager: values.projectManager,
        startDate: values.startDate,
        endDate: values.endDate,
        priority: values.priority,
        status: values.status,
        budget: Number(values.budget),
      };

      if (id) {
        dispatch(updateProjectRequest({ id, data: payload }));
        return;
      }

      dispatch(createProjectRequest(payload));
    },
  });

  useEffect(() => {
    if (!project || !id) return;

    const projectData = project?.data || project;

    const departmentId =
      projectData?.department?._id ||
      projectData?.department ||
      "";

    const managerId =
      projectData?.projectManager?._id ||
      projectData?.projectManager ||
      "";

    formik.setValues({
      name: projectData?.name || "",
      description: projectData?.description || "",
      department: departmentId,
      projectManager: managerId,
      startDate: projectData?.startDate
        ? new Date(projectData.startDate).toISOString().split("T")[0]
        : "",
      endDate: projectData?.endDate
        ? new Date(projectData.endDate).toISOString().split("T")[0]
        : "",
      priority: projectData?.priority || "Medium",
      status: projectData?.status || "Planning",
      budget:
        projectData?.budget !== undefined &&
        projectData?.budget !== null
          ? projectData.budget
          : "",
    });

    if (departmentId) {
      dispatch(getDepartmentManagersRequest(departmentId));
    }
  }, [project, id, dispatch]);

  useEffect(() => {
    if (createProjectSuccess || updateProjectSuccess) {
      dispatch(clearProjectState());
      navigate("/admin/projects");
    }
  }, [
    createProjectSuccess,
    updateProjectSuccess,
    dispatch,
    navigate,
  ]);

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;

    formik.setFieldValue("department", departmentId);
    formik.setFieldValue("projectManager", "");

    if (departmentId) {
      dispatch(getDepartmentManagersRequest(departmentId));
    }
  };

 useEffect(() => {
    dispatch(clearProjectState());
  }, [dispatch]);

  if (id && getProjectByIdLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-slate-600 dark:text-slate-300 font-medium">
          Loading project...
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none";

  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-100 dark:disabled:bg-slate-800";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 text-slate-800 dark:text-slate-100">

      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              {id ? "Edit Project" : "Create Project"}
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {id
                ? "Update project information and assignment."
                : "Create a new project and assign it to a department manager."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
        >

          <div className="p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FolderKanban size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Project Information
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Enter the basic details of your project.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter project name"
                className={inputClass}
              />

              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Describe the project..."
                className={`${inputClass} resize-none`}
              />

              {formik.touched.description &&
                formik.errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.description}
                  </p>
                )}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Project Assignment
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Select the department and manager responsible for this project.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <Building2 size={16} />
                  Department
                </label>

                <select
                  name="department"
                  value={formik.values.department}
                  onChange={handleDepartmentChange}
                  onBlur={formik.handleBlur}
                  disabled={getDepartmentsLoading}
                  className={selectClass}
                >
                  <option value="">
                    {getDepartmentsLoading
                      ? "Loading Departments..."
                      : "Select Department"}
                  </option>

                  {departments.map((department) => (
                    <option
                      key={department._id}
                      value={department._id}
                    >
                      {department.name}
                    </option>
                  ))}
                </select>

                {formik.touched.department &&
                  formik.errors.department && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.department}
                    </p>
                  )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <Users size={16} />
                  Project Manager
                </label>

                <select
                  name="projectManager"
                  value={formik.values.projectManager}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    !formik.values.department || managersLoading
                  }
                  className={selectClass}
                >
                  <option value="">
                    {!formik.values.department
                      ? "Select Department First"
                      : managersLoading
                      ? "Loading Managers..."
                      : "Select Manager"}
                  </option>

                  {managers.map((manager) => (
                    <option
                      key={manager._id}
                      value={manager._id}
                    >
                      {manager.name}
                    </option>
                  ))}
                </select>

                {formik.touched.projectManager &&
                  formik.errors.projectManager && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.projectManager}
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="p-7 border-t border-slate-200 dark:border-slate-800">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Project Settings
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Set project timeline, priority and current status.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />

                {formik.touched.startDate &&
                  formik.errors.startDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.startDate}
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                />

                {formik.touched.endDate &&
                  formik.errors.endDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.endDate}
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Priority
                </label>

                <select
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={selectClass}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={selectClass}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="mt-5 max-w-md">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Project Budget
              </label>

              <input
                type="number"
                name="budget"
                value={formik.values.budget}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter project budget"
                className={inputClass}
              />

              {formik.touched.budget &&
                formik.errors.budget && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.budget}
                  </p>
                )}
            </div>
          </div>

          {apiError && (
            <div className="mx-7 mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
              <p className="text-sm text-red-600 dark:text-red-400">
                {apiError}
              </p>
            </div>
          )}

          <div className="px-7 py-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              disabled={submitting}
              className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting
                ? id
                  ? "Updating..."
                  : "Creating..."
                : id
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;