import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  ArrowLeft,
  FileText,
  Plus,
} from "lucide-react";

import {
  createDepartmentRequest,
  clearDepartmentState,
} from "../../../features/department/departmentSlice";

const AddDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    createLoading,
    createSuccess,
    createError,
  } = useSelector((state) => state.department);

  // ================= SUCCESS =================

  useEffect(() => {
    if (createSuccess) {
      dispatch(clearDepartmentState());
      navigate("/admin/departments");
    }
  }, [createSuccess, dispatch, navigate]);


  useEffect(() => {
    return () => {
      dispatch(clearDepartmentState());
    };
  }, [dispatch]);

  // ================= FORMIK =================

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(
        "Department name is required"
      ),

      description: Yup.string(),
    }),

    onSubmit: (values) => {
      dispatch(
        createDepartmentRequest(values)
      );
    },
  });

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4"
      >

        <div className="flex items-center gap-4">

          <div
            className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-br from-indigo-500 to-violet-600
              text-white
              shadow-lg shadow-indigo-200 dark:shadow-none
              flex items-center justify-center
            "
          >
            <Building2 size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Create Department
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Add a new department to your organization.
            </p>

          </div>

        </div>

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => navigate("/admin/departments")}
          className="
            inline-flex items-center
            justify-center gap-2
            px-5 py-3
            rounded-xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            text-slate-600 dark:text-slate-300
            font-semibold text-sm
            hover:bg-slate-50 dark:hover:bg-slate-800
            hover:text-indigo-600 dark:hover:text-indigo-400
            transition
            shadow-sm dark:shadow-none
          "
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* ================================================= */}
      {/* FORM CARD */}
      {/* ================================================= */}

      <div
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          shadow-sm dark:shadow-none
          overflow-hidden
          max-w-3xl
        "
      >

        {/* CARD HEADER */}

        <div
          className="
            px-6 py-5
            border-b border-slate-200 dark:border-slate-700
            bg-slate-50/70 dark:bg-slate-800/50
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-indigo-50 dark:bg-indigo-500/10
                text-indigo-600 dark:text-indigo-400
                flex items-center justify-center
              "
            >
              <Plus size={19} />
            </div>

            <div>

              <h2 className="font-bold text-slate-800 dark:text-white">
                Department Information
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Enter the details for the new department.
              </p>

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="p-6">

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6"
          >

            {/* ================================================= */}
            {/* DEPARTMENT NAME */}
            {/* ================================================= */}

            <div>

              <label
                className="
                  block mb-2
                  text-sm font-semibold
                  text-slate-700 dark:text-slate-300
                "
              >
                Department Name
              </label>

              <div className="relative">

                <Building2
                  size={18}
                  className="
                    absolute
                    left-4 top-1/2
                    -translate-y-1/2
                    text-slate-400 dark:text-slate-500
                  "
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter department name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full h-12
                    border
                    rounded-xl
                    pl-11 pr-4
                    text-sm
                    text-slate-700 dark:text-slate-200
                    outline-none
                    bg-slate-50 dark:bg-slate-800
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    focus:bg-white dark:focus:bg-slate-900
                    focus:ring-4
                    transition
                    ${
                      formik.touched.name &&
                      formik.errors.name
                        ? "border-red-300 dark:border-red-500 focus:border-red-400 focus:ring-red-500/10"
                        : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-indigo-500/10"
                    }`}
                />

              </div>

              {formik.touched.name &&
                formik.errors.name && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-2">
                    {formik.errors.name}
                  </p>
                )}

            </div>

            {/* ================================================= */}
            {/* DESCRIPTION */}
            {/* ================================================= */}

            <div>

              <label
                className="
                  block mb-2
                  text-sm font-semibold
                  text-slate-700 dark:text-slate-300
                "
              >
                Description
              </label>

              <div className="relative">

                <FileText
                  size={18}
                  className="
                    absolute
                    left-4 top-4
                    text-slate-400 dark:text-slate-500
                  "
                />

                <textarea
                  name="description"
                  rows={5}
                  placeholder="Enter department description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="
                    w-full
                    border border-slate-200 dark:border-slate-700
                    rounded-xl
                    pl-11 pr-4 py-3
                    text-sm
                    text-slate-700 dark:text-slate-200
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    outline-none
                    bg-slate-50 dark:bg-slate-800
                    resize-none
                    focus:bg-white dark:focus:bg-slate-900
                    focus:border-indigo-400
                    focus:ring-4
                    focus:ring-indigo-500/10
                    transition
                  "
                />

              </div>

              {formik.touched.description &&
                formik.errors.description && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-2">
                    {formik.errors.description}
                  </p>
                )}

            </div>

            {/* ================================================= */}
            {/* API ERROR */}
            {/* ================================================= */}

            {createError && (

              <div
                className="
                  p-4
                  rounded-xl
                  bg-red-50 dark:bg-red-500/10
                  border border-red-200 dark:border-red-500/20
                  text-red-600 dark:text-red-400
                  text-sm
                "
              >
                {createError}
              </div>

            )}

            {/* ================================================= */}
            {/* ACTIONS */}
            {/* ================================================= */}

            <div
              className="
                flex flex-col sm:flex-row
                justify-end gap-3
                pt-4
                border-t border-slate-100 dark:border-slate-800
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/departments")
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5 py-3
                  rounded-xl
                  border border-slate-200 dark:border-slate-700
                  bg-white dark:bg-slate-900
                  text-slate-600 dark:text-slate-300
                  text-sm
                  font-semibold
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  transition
                "
              >
                <ArrowLeft size={17} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={createLoading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6 py-3
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  disabled:bg-slate-400
                  text-white
                  text-sm
                  font-semibold
                  shadow-md
                  shadow-indigo-100 dark:shadow-none
                  transition
                "
              >

                <Plus size={18} />

                {createLoading
                  ? "Creating..."
                  : "Create Department"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddDepartment;