import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createRoleRequest } from "../../../features/role/roleSlice";

const AddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createLoading, createError } = useSelector(
    (state) => state.role
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Role Name is required"),
      description: Yup.string().required("Description is required"),
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-6">
          Add Role
        </h2>

        {createError && (
          <p className="text-red-500 mb-4">
            {createError}
          </p>
        )}

        <form onSubmit={formik.handleSubmit}>

          <div className="mb-4">
            <label className="block mb-2">
              Role Name
            </label>

            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded p-3"
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded p-3"
            />

            {formik.touched.description &&
              formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </p>
              )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={createLoading}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              {createLoading ? "Creating..." : "Create Role"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/roles")}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddRole;