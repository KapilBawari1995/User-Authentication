
import React, { useEffect } from "react";
import {
  ArrowLeft,
  FolderKanban,
  Users,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  getDepartmentsRequest,
  getDepartmentManagersRequest,
} from "../../../features/department/departmentSlice";

import { createProjectRequest } from "../../../features/project/projectSlice";

const AddProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =========================================================
  // DEPARTMENT STATE
  // =========================================================

  const {
    departments = [],
    managers = [],
    getDepartmentsLoading,
    managersLoading,
  } = useSelector((state) => state.department);

  // =========================================================
  // PROJECT STATE
  // =========================================================

  const {
    createLoading = false,
    createSuccess = false,
    createError = null,
  } = useSelector((state) => state.project || {});

  // =========================================================
  // GET DEPARTMENTS
  // =========================================================

  useEffect(() => {
    dispatch(getDepartmentsRequest());
  }, [dispatch]);

  // =========================================================
  // PROJECT CREATE SUCCESS
  // =========================================================

  useEffect(() => {
    if (createSuccess) {
      navigate("/admin/projects");
    }
  }, [createSuccess, navigate]);

  // =========================================================
  // VALIDATION
  // =========================================================

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Project name is required"),

    description: Yup.string()
      .trim()
      .required("Description is required"),

    department: Yup.string()
      .required("Please select department"),

    projectManager: Yup.string()
      .required("Please select manager"),

    startDate: Yup.date()
      .required("Start date is required"),

    endDate: Yup.date()
      .required("End date is required")
      .min(
        Yup.ref("startDate"),
        "End date must be after start date"
      ),

    priority: Yup.string()
      .required("Please select priority"),

    status: Yup.string()
      .required("Please select status"),

    budget: Yup.number()
      .typeError("Budget must be a number")
      .min(0, "Budget cannot be negative")
      .required("Budget is required"),
  });

  // =========================================================
  // FORMIK
  // =========================================================

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
        budget: values.budget,
      };

      console.log("CREATE PROJECT PAYLOAD:", payload);

      dispatch(createProjectRequest(payload));
    },
  });

  // =========================================================
  // DEPARTMENT CHANGE
  // =========================================================

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;

    // Set selected department
    formik.setFieldValue("department", departmentId);

    // Reset manager whenever department changes
    formik.setFieldValue("projectManager", "");

    // Get managers of selected department
    if (departmentId) {
      dispatch(getDepartmentManagersRequest(departmentId));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between mb-7">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="
              w-10 h-10 rounded-xl
              bg-white border border-slate-200
              flex items-center justify-center
              text-slate-600
              hover:bg-slate-100
              transition
            "
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Create Project
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Create a new project and assign it to a department manager.
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="max-w-6xl mx-auto">

        <form
          onSubmit={formik.handleSubmit}
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* =================================================
              PROJECT INFORMATION
          ================================================= */}

          <div className="p-7">

            <div className="flex items-center gap-3 mb-6">

              <div
                className="
                  w-11 h-11 rounded-xl
                  bg-indigo-50 text-indigo-600
                  flex items-center justify-center
                "
              >
                <FolderKanban size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Project Information
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the basic details of your project.
                </p>
              </div>

            </div>

            {/* =================================================
                PROJECT NAME
            ================================================= */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter project name"
                className="
                  w-full px-4 py-3
                  rounded-xl
                  border border-slate-300
                  focus:ring-2 focus:ring-indigo-500
                  focus:border-indigo-500
                  outline-none
                  transition
                "
              />

              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.name}
                </p>
              )}

            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="mt-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Describe the project..."
                className="
                  w-full px-4 py-3
                  rounded-xl
                  border border-slate-300
                  focus:ring-2 focus:ring-indigo-500
                  focus:border-indigo-500
                  outline-none
                  resize-none
                  transition
                "
              />

              {formik.touched.description &&
                formik.errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.description}
                  </p>
                )}

            </div>

          </div>

          {/* =================================================
              PROJECT ASSIGNMENT
          ================================================= */}

          <div className="border-t border-slate-200 bg-slate-50/70 p-7">

            <div className="flex items-center gap-3 mb-6">

              <div
                className="
                  w-11 h-11 rounded-xl
                  bg-emerald-50 text-emerald-600
                  flex items-center justify-center
                "
              >
                <Users size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Project Assignment
                </h2>

                <p className="text-sm text-slate-500">
                  Select the department and manager responsible for this project.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* =================================================
                  DEPARTMENT
              ================================================= */}

              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Building2 size={16} />
                  Department
                </label>

                <select
                  name="department"
                  value={formik.values.department}
                  onChange={handleDepartmentChange}
                  onBlur={formik.handleBlur}
                  disabled={getDepartmentsLoading}
                  className="
                    w-full px-4 py-3
                    rounded-xl
                    border border-slate-300
                    bg-white
                    focus:ring-2 focus:ring-indigo-500
                    focus:border-indigo-500
                    outline-none
                    transition
                    disabled:bg-slate-100
                    disabled:text-slate-400
                  "
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

                <p className="text-xs text-slate-500 mt-2">
                  Select the department responsible for this project.
                </p>

              </div>

              {/* =================================================
                  PROJECT MANAGER
              ================================================= */}

              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Users size={16} />
                  Project Manager
                </label>

                <select
                  name="projectManager"
                  value={formik.values.projectManager}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    !formik.values.department ||
                    managersLoading
                  }
                  className="
                    w-full px-4 py-3
                    rounded-xl
                    border border-slate-300
                    bg-white
                    focus:ring-2 focus:ring-indigo-500
                    focus:border-indigo-500
                    outline-none
                    transition
                    disabled:bg-slate-100
                    disabled:text-slate-400
                  "
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

                <p className="text-xs text-slate-500 mt-2">
                  Managers are loaded based on the selected department.
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              PROJECT SETTINGS
          ================================================= */}

          <div className="p-7 border-t border-slate-200">

            <div className="mb-6">

              <h2 className="text-lg font-semibold text-slate-800">
                Project Settings
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Set project timeline, priority and current status.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* =================================================
                  START DATE
              ================================================= */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="
                    w-full px-4 py-3
                    rounded-xl
                    border border-slate-300
                    focus:ring-2 focus:ring-indigo-500
                    outline-none
                  "
                />

                {formik.touched.startDate &&
                  formik.errors.startDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.startDate}
                    </p>
                  )}

              </div>

              {/* =================================================
                  END DATE
              ================================================= */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="
                    w-full px-4 py-3
                    rounded-xl
                    border border-slate-300
                    focus:ring-2 focus:ring-indigo-500
                    outline-none
                  "
                />

                {formik.touched.endDate &&
                  formik.errors.endDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.endDate}
                    </p>
                  )}

              </div>

              {/* =================================================
                  PRIORITY
              ================================================= */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Priority
                </label>

                <select
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="
                    w-full px-4 py-3
                    rounded-xl
                    border border-slate-300
                    bg-white
                    focus:ring-2 focus:ring-indigo-500
                    outline-none
                  "
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>

                {formik.touched.priority &&
                  formik.errors.priority && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.priority}
                    </p>
                  )}

              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="
                    w-full px-4 py-3
                    rounded-xl
                    border border-slate-300
                    bg-white
                    focus:ring-2 focus:ring-indigo-500
                    outline-none
                  "
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>

                {formik.touched.status &&
                  formik.errors.status && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.status}
                    </p>
                  )}

              </div>

            </div>

            {/* =================================================
                BUDGET
            ================================================= */}

            <div className="mt-5 max-w-md">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Budget
              </label>

              <input
                type="number"
                name="budget"
                value={formik.values.budget}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter project budget"
                className="
                  w-full px-4 py-3
                  rounded-xl
                  border border-slate-300
                  focus:ring-2 focus:ring-indigo-500
                  outline-none
                "
              />

              {formik.touched.budget &&
                formik.errors.budget && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.budget}
                  </p>
                )}

            </div>

          </div>

          {/* =================================================
              API ERROR
          ================================================= */}

          {createError && (
            <div className="mx-7 mb-5 p-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">
                {createError}
              </p>
            </div>
          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              px-7 py-5
              border-t border-slate-200
              bg-slate-50
              flex items-center justify-end gap-3
            "
          >

            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              disabled={createLoading}
              className="
                px-6 py-3
                rounded-xl
                border border-slate-300
                bg-white
                text-slate-700
                font-semibold
                hover:bg-slate-100
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createLoading}
              className="
                px-7 py-3
                rounded-xl
                bg-indigo-600
                text-white
                font-semibold
                hover:bg-indigo-700
                transition
                shadow-sm
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {createLoading
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddProject;
