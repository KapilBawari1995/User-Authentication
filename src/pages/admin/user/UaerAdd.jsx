import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  createUserRequest,
  clearCreateUserState,
} from "../../../features/user/userSlice";

import { getRolesRequest } from "../../../features/role/roleSlice";

export default function AddUser() {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.role);
  const { createUserLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getRolesRequest());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCreateUserState());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
      role: Yup.string().required("Role is required"),
    }),

    onSubmit: (values) => {
      dispatch(
        createUserRequest({
          data: values,
        })
      );
    },
  });

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-5">Add User</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          <option value="">Select Role</option>

          {roles?.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={createUserLoading}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {createUserLoading ? "Creating..." : "Create User"}
        </button>

      </form>
    </div>
  );
}