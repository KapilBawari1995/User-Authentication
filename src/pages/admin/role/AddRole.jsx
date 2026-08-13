import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  Save,
  FileText,
  CheckCircle2,
} from "lucide-react";

import { createRoleRequest } from "../../../features/role/roleSlice";

const AddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    createLoading,
    createError,
  } = useSelector((state) => state.role);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Role Name is required"),

      description: Yup.string()
        .trim()
        .required("Description is required"),
    }),

    onSubmit: (values) => {
      dispatch(
        createRoleRequest({
          data: values,
          navigate,
        })
      );
    },
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 p-6 text-slate-800 dark:text-slate-100">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

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
            <ShieldCheck size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Create New Role
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Create a role that can be assigned to users.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/roles")}
          className="
            inline-flex items-center justify-center
            gap-2 px-4 py-2.5 rounded-xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            text-slate-600 dark:text-slate-300
            font-medium
            hover:bg-slate-50 dark:hover:bg-slate-800
            transition
          "
        >
          <ArrowLeft size={18} />
          Back to Roles
        </button>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {createError && (

        <div
          className="
            mb-6 flex items-start gap-3
            bg-red-50 dark:bg-red-500/10
            border border-red-200 dark:border-red-500/20
            rounded-xl p-4
            text-red-600 dark:text-red-400
          "
        >

          <div
            className="
              w-7 h-7 rounded-full
              bg-red-100 dark:bg-red-500/20
              flex items-center justify-center shrink-0
            "
          >
            !
          </div>

          <div>

            <p className="font-semibold text-sm">
              Unable to create role
            </p>

            <p className="text-sm mt-0.5">
              {createError}
            </p>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* MAIN CARD */}
      {/* ================================================= */}

      <div className="max-w-4xl">

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            shadow-sm dark:shadow-none
            overflow-hidden
          "
        >

          {/* CARD HEADER */}

          <div
            className="
              px-6 py-5
              border-b border-slate-200 dark:border-slate-700
              bg-gradient-to-r
              from-slate-50 to-white
              dark:from-slate-800 dark:to-slate-900
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10 h-10 rounded-xl
                  bg-indigo-50 dark:bg-indigo-500/10
                  text-indigo-600 dark:text-indigo-400
                  flex items-center justify-center
                "
              >
                <FileText size={20} />
              </div>

              <div>

                <h2 className="font-bold text-slate-800 dark:text-white">
                  Role Information
                </h2>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Enter the basic details for this role.
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={formik.handleSubmit}
            className="p-6"
          >

            <div className="grid grid-cols-1 gap-6">

              {/* ROLE NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="
                    block text-sm
                    font-semibold text-slate-700 dark:text-slate-300
                    mb-2
                  "
                >
                  Role Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g. Manager"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full h-12 px-4
                    border rounded-xl
                    text-sm outline-none
                    transition
                    bg-slate-50 dark:bg-slate-800
                    text-slate-800 dark:text-slate-100
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    ${
                      formik.touched.name &&
                      formik.errors.name
                        ? "border-red-300 dark:border-red-500 bg-red-50/30 dark:bg-red-500/10 focus:ring-4 focus:ring-red-500/10"
                        : "border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                />

                {formik.touched.name &&
                  formik.errors.name && (

                    <p className="text-red-500 dark:text-red-400 text-xs mt-2">
                      {formik.errors.name}
                    </p>

                  )}

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="description"
                  className="
                    block text-sm
                    font-semibold text-slate-700 dark:text-slate-300
                    mb-2
                  "
                >
                  Description
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Describe the responsibilities and access level of this role..."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3
                    border rounded-xl
                    text-sm outline-none
                    resize-none transition
                    bg-slate-50 dark:bg-slate-800
                    text-slate-800 dark:text-slate-100
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    ${
                      formik.touched.description &&
                      formik.errors.description
                        ? "border-red-300 dark:border-red-500 bg-red-50/30 dark:bg-red-500/10 focus:ring-4 focus:ring-red-500/10"
                        : "border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                />

                <div className="flex items-center justify-between mt-2">

                  <div>

                    {formik.touched.description &&
                    formik.errors.description ? (

                      <p className="text-red-500 dark:text-red-400 text-xs">
                        {formik.errors.description}
                      </p>

                    ) : (

                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Add a short explanation of this role.
                      </p>

                    )}

                  </div>

                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {formik.values.description.length} characters
                  </span>

                </div>

              </div>

            </div>

            {/* INFO BOX */}

            <div
              className="
                mt-7 p-4 rounded-xl
                bg-indigo-50 dark:bg-indigo-500/10
                border border-indigo-100 dark:border-indigo-500/20
                flex items-start gap-3
              "
            >

              <CheckCircle2
                size={19}
                className="text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0"
              />

              <div>

                <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">
                  Permissions can be configured later
                </p>

                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                  After creating the role, you can assign
                  module permissions from Permission Management.
                </p>

              </div>

            </div>

            {/* BUTTONS */}

            <div
              className="
                flex flex-col-reverse
                sm:flex-row sm:justify-end
                gap-3 mt-8 pt-6
                border-t border-slate-100 dark:border-slate-800
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/roles")
                }
                disabled={createLoading}
                className="
                  px-5 py-3 rounded-xl
                  border border-slate-200 dark:border-slate-700
                  bg-white dark:bg-slate-900
                  text-slate-600 dark:text-slate-300
                  font-semibold text-sm
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  disabled:opacity-50
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={createLoading}
                className="
                  inline-flex items-center
                  justify-center gap-2
                  px-6 py-3 rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-semibold text-sm
                  shadow-md shadow-indigo-100
                  dark:shadow-none
                  disabled:bg-slate-400
                  disabled:shadow-none
                  transition
                "
              >

                {createLoading ? (

                  <>
                    <span
                      className="
                        w-4 h-4
                        border-2 border-white
                        border-t-transparent
                        rounded-full animate-spin
                      "
                    />

                    Creating Role...
                  </>

                ) : (

                  <>
                    <Save size={18} />
                    Create Role
                  </>

                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddRole;