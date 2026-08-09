import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserPlus,
  ArrowLeft,
  Save,
  User,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  createUserRequest,
  getUserByIdRequest,
  updateUserRequest,
  clearUserState,
} from "../../../features/user/userSlice";

import { getRolesRequest } from "../../../features/role/roleSlice";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { roles } = useSelector(
    (state) => state.role
  );

  const {
    createUserLoading,
    user,
    createUserSuccess,
    updateUserSuccess,
    createUserError,
    updateUserError,
  } = useSelector(
    (state) => state.user
  );

  const isEditMode = !!id;

  // ================= GET USER =================

  useEffect(() => {
    if (isEditMode) {
      dispatch(getUserByIdRequest(id));
    }
  }, [dispatch, id, isEditMode]);

  // ================= GET ROLES =================

  useEffect(() => {
    dispatch(getRolesRequest());
  }, [dispatch]);

  // ================= SUCCESS =================

  useEffect(() => {
    if (createUserSuccess || updateUserSuccess) {
      dispatch(clearUserState());
      navigate("/admin/users");
    }
  }, [
    createUserSuccess,
    updateUserSuccess,
    dispatch,
    navigate,
  ]);

  // ================= CLEANUP =================

  useEffect(() => {
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  // ================= FORMIK =================

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role?._id || "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Name is required"),

      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      role: Yup.string()
        .required("Role is required"),
    }),

    onSubmit: (values) => {
      if (isEditMode) {
        dispatch(
          updateUserRequest({
            id,
            data: values,
          })
        );
      } else {
        dispatch(
          createUserRequest(values)
        );
      }
    },
  });

  const formError =
    createUserError || updateUserError;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4 mb-8"
      >

        <div className="flex items-center gap-4">

          <div
            className="w-14 h-14 rounded-2xl
            bg-gradient-to-br from-indigo-500 to-violet-600
            text-white shadow-lg shadow-indigo-200
            flex items-center justify-center"
          >
            <UserPlus size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              {isEditMode
                ? "Edit User"
                : "Create New User"}
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              {isEditMode
                ? "Update user information and role."
                : "Create a new user and assign a role."}
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={() =>
            navigate("/admin/users")
          }
          className="inline-flex items-center
          justify-center gap-2 px-4 py-2.5
          rounded-xl border border-slate-200
          bg-white text-slate-600
          font-medium hover:bg-slate-50
          transition"
        >
          <ArrowLeft size={18} />
          Back to Users
        </button>

      </div>


      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {formError && (

        <div
          className="max-w-4xl mb-6
          p-4 rounded-xl
          bg-red-50 border border-red-200
          text-red-600"
        >

          <p className="font-semibold text-sm">
            Unable to save user
          </p>

          <p className="text-sm mt-1">
            {formError}
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* MAIN CARD */}
      {/* ================================================= */}

      <div className="max-w-4xl">

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          shadow-sm overflow-hidden"
        >

          {/* CARD HEADER */}

          <div
            className="px-6 py-5
            border-b border-slate-200
            bg-gradient-to-r
            from-slate-50 to-white"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-10 h-10 rounded-xl
                bg-indigo-50 text-indigo-600
                flex items-center justify-center"
              >
                <User size={20} />
              </div>

              <div>

                <h2 className="font-bold text-slate-800">
                  User Information
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Enter the user's basic information
                  and assign a role.
                </p>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={formik.handleSubmit}
            className="p-6"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              {/* ================================================= */}
              {/* NAME */}
              {/* ================================================= */}

              <div>

                <label
                  htmlFor="name"
                  className="block text-sm
                  font-semibold text-slate-700 mb-2"
                >
                  Full Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4
                    top-1/2 -translate-y-1/2
                    text-slate-400"
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full h-12
                    pl-11 pr-4
                    border rounded-xl
                    text-sm outline-none
                    transition
                    ${
                      formik.touched.name &&
                      formik.errors.name
                        ? "border-red-300 bg-red-50/30"
                        : "border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                    }`}
                  />

                </div>

                {formik.touched.name &&
                  formik.errors.name && (

                    <p className="text-red-500 text-xs mt-2">
                      {formik.errors.name}
                    </p>

                  )}

              </div>


              {/* ================================================= */}
              {/* EMAIL */}
              {/* ================================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="block text-sm
                  font-semibold text-slate-700 mb-2"
                >
                  Email Address
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4
                    top-1/2 -translate-y-1/2
                    text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full h-12
                    pl-11 pr-4
                    border rounded-xl
                    text-sm outline-none
                    transition
                    ${
                      formik.touched.email &&
                      formik.errors.email
                        ? "border-red-300 bg-red-50/30"
                        : "border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                    }`}
                  />

                </div>

                {formik.touched.email &&
                  formik.errors.email && (

                    <p className="text-red-500 text-xs mt-2">
                      {formik.errors.email}
                    </p>

                  )}

              </div>


              {/* ================================================= */}
              {/* ROLE */}
              {/* ================================================= */}

              <div className="md:col-span-2">

                <label
                  htmlFor="role"
                  className="block text-sm
                  font-semibold text-slate-700 mb-2"
                >
                  User Role
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <ShieldCheck
                    size={18}
                    className="absolute left-4
                    top-1/2 -translate-y-1/2
                    text-slate-400 pointer-events-none"
                  />

                  <select
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full h-12
                    pl-11 pr-4
                    border rounded-xl
                    text-sm outline-none
                    appearance-none
                    transition
                    ${
                      formik.touched.role &&
                      formik.errors.role
                        ? "border-red-300 bg-red-50/30"
                        : "border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                    }`}
                  >

                    <option value="">
                      Select a role
                    </option>

                    {roles?.map((role) => (

                      <option
                        key={role._id}
                        value={role._id}
                      >
                        {role.name}
                      </option>

                    ))}

                  </select>

                </div>

                {formik.touched.role &&
                  formik.errors.role && (

                    <p className="text-red-500 text-xs mt-2">
                      {formik.errors.role}
                    </p>

                  )}

                <p className="text-xs text-slate-400 mt-2">
                  The selected role determines the user's
                  access and permissions.
                </p>

              </div>

            </div>


            {/* ================================================= */}
            {/* INFO */}
            {/* ================================================= */}

            {!isEditMode && (

              <div
                className="mt-7 p-4 rounded-xl
                bg-indigo-50 border border-indigo-100
                flex items-start gap-3"
              >

                <ShieldCheck
                  size={19}
                  className="text-indigo-600
                  mt-0.5 shrink-0"
                />

                <div>

                  <p className="text-sm font-semibold text-indigo-800">
                    Role-based access
                  </p>

                  <p className="text-xs text-indigo-600 mt-1">
                    The user will receive permissions
                    according to the selected role.
                  </p>

                </div>

              </div>

            )}


            {/* ================================================= */}
            {/* BUTTONS */}
            {/* ================================================= */}

            <div
              className="flex flex-col-reverse
              sm:flex-row sm:justify-end
              gap-3 mt-8 pt-6
              border-t border-slate-100"
            >

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/users")
                }
                disabled={createUserLoading}
                className="px-5 py-3 rounded-xl
                border border-slate-200
                bg-white text-slate-600
                font-semibold text-sm
                hover:bg-slate-50
                disabled:opacity-50
                transition"
              >
                Cancel
              </button>


              <button
                type="submit"
                disabled={createUserLoading}
                className="inline-flex items-center
                justify-center gap-2
                px-6 py-3 rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-semibold text-sm
                shadow-md shadow-indigo-100
                disabled:bg-slate-400
                disabled:shadow-none
                transition"
              >

                {createUserLoading ? (

                  <>
                    <span
                      className="w-4 h-4
                      border-2 border-white
                      border-t-transparent
                      rounded-full animate-spin"
                    />

                    {isEditMode
                      ? "Updating User..."
                      : "Creating User..."}
                  </>

                ) : (

                  <>
                    <Save size={18} />

                    {isEditMode
                      ? "Update User"
                      : "Create User"}
                  </>

                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}