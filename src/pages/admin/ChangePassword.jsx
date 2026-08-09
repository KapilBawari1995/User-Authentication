
import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Save,
  X,
  CheckCircle2,
  KeyRound,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  sendChangePasswordOtpRequest,
  verifyAndChangePasswordRequest,
  clearChangePasswordState,
} from "../../features/auth/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();

  const { changePassLoading, changePassOtpSent } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // ================= VALIDATION =================

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(
      "Current Password is required"
    ),

    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "One uppercase letter required")
      .matches(/[a-z]/, "One lowercase letter required")
      .matches(/[0-9]/, "One number required")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "One special character required"
      ),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        "Passwords do not match"
      )
      .required("Confirm Password is required"),

    otp: Yup.string(),
  });

  // ================= FORMIK =================

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      otp: "",
    },

    validationSchema,

    onSubmit: (values) => {
      if (!changePassOtpSent) {
        dispatch(
          sendChangePasswordOtpRequest({
            data: {
              oldPassword: values.currentPassword,
            },
          })
        );
      } else {
        dispatch(
          verifyAndChangePasswordRequest({
            data: {
              otp: values.otp,
              newPassword: values.newPassword,
            },
          })
        );
      }
    },
  });

  // ================= PASSWORD INPUT =================

  const PasswordInput = ({
    name,
    label,
    placeholder,
    field,
  }) => {
    const hasError =
      formik.touched[name] && formik.errors[name];

    return (
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <Lock size={16} className="text-indigo-500" />
          {label}
        </label>

        <div
          className={`relative ${
            hasError ? "mb-1" : ""
          }`}
        >
          <input
            type={showPassword[field] ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full h-12 px-4 pr-12 rounded-xl border
              bg-slate-50 text-sm text-slate-700
              outline-none transition
              focus:bg-white
              focus:ring-4
              ${
                hasError
                  ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                  : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-50"
              }`}
          />

          <button
            type="button"
            onClick={() => togglePassword(field)}
            className="absolute right-3 top-1/2 -translate-y-1/2
              w-8 h-8 rounded-lg
              text-slate-400 hover:text-indigo-600
              hover:bg-indigo-50
              flex items-center justify-center
              transition"
          >
            {showPassword[field] ? (
              <EyeOff size={19} />
            ) : (
              <Eye size={19} />
            )}
          </button>
        </div>

        {hasError && (
          <p className="text-xs text-red-500 mt-1">
            {formik.errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-full">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div className="flex items-center gap-4">

          <div
            className="w-14 h-14 rounded-2xl
            bg-gradient-to-br from-indigo-500 to-violet-600
            text-white shadow-lg shadow-indigo-200
            flex items-center justify-center"
          >
            <ShieldCheck size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Change Password
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Update your account password securely.
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ================================================= */}
        {/* PASSWORD FORM */}
        {/* ================================================= */}

        <div
          className="xl:col-span-2
          bg-white rounded-2xl
          border border-slate-200
          shadow-sm overflow-hidden"
        >

          {/* CARD HEADER */}

          <div
            className="px-6 py-5
            border-b border-slate-200
            flex items-center gap-3"
          >

            <div
              className="w-10 h-10 rounded-xl
              bg-indigo-50 text-indigo-600
              flex items-center justify-center"
            >
              <KeyRound size={20} />
            </div>

            <div>

              <h2 className="font-bold text-slate-800">
                Password Security
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Enter your current and new password.
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={formik.handleSubmit}
            className="p-6 space-y-5"
          >

            <PasswordInput
              name="currentPassword"
              label="Current Password"
              placeholder="Enter current password"
              field="current"
            />

            <PasswordInput
              name="newPassword"
              label="New Password"
              placeholder="Enter new password"
              field="new"
            />

            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm new password"
              field="confirm"
            />

            {/* ================================================= */}
            {/* OTP */}
            {/* ================================================= */}

            {changePassOtpSent && (
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <ShieldCheck
                    size={16}
                    className="text-indigo-500"
                  />
                  Verification OTP
                </label>

                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={6}
                  className="w-full h-12 px-4
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    text-sm
                    outline-none
                    focus:bg-white
                    focus:border-indigo-400
                    focus:ring-4
                    focus:ring-indigo-50
                    transition"
                />

              </div>
            )}

            {/* ================================================= */}
            {/* BUTTONS */}
            {/* ================================================= */}

            <div
              className="pt-4
              border-t border-slate-100
              flex flex-col sm:flex-row
              justify-end gap-3"
            >

              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  dispatch(clearChangePasswordState());
                }}
                className="inline-flex items-center
                  justify-center gap-2
                  h-11 px-5
                  rounded-xl
                  border border-slate-200
                  bg-white
                  text-slate-600
                  text-sm font-semibold
                  hover:bg-slate-50
                  transition"
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={changePassLoading}
                className="inline-flex items-center
                  justify-center gap-2
                  h-11 px-6
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  disabled:bg-slate-400
                  text-white
                  text-sm font-semibold
                  shadow-md shadow-indigo-100
                  transition"
              >

                <Save size={17} />

                {changePassLoading
                  ? "Please Wait..."
                  : changePassOtpSent
                  ? "Verify OTP & Update"
                  : "Send OTP"}

              </button>

            </div>

          </form>

        </div>

        {/* ================================================= */}
        {/* PASSWORD REQUIREMENTS */}
        {/* ================================================= */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          shadow-sm overflow-hidden
          h-fit"
        >

          <div
            className="px-6 py-5
            border-b border-slate-200"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-10 h-10 rounded-xl
                bg-emerald-50
                text-emerald-600
                flex items-center justify-center"
              >
                <CheckCircle2 size={20} />
              </div>

              <div>

                <h2 className="font-bold text-slate-800">
                  Password Requirements
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Keep your account secure.
                </p>

              </div>

            </div>

          </div>

          <div className="p-6">

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />
                <span className="text-sm text-slate-600">
                  Minimum 8 characters
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />
                <span className="text-sm text-slate-600">
                  One uppercase letter
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />
                <span className="text-sm text-slate-600">
                  One lowercase letter
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />
                <span className="text-sm text-slate-600">
                  One number
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />
                <span className="text-sm text-slate-600">
                  One special character
                </span>
              </div>

            </div>

            <div
              className="mt-6 p-4 rounded-xl
              bg-indigo-50
              border border-indigo-100"
            >

              <div className="flex gap-3">

                <ShieldCheck
                  size={20}
                  className="text-indigo-600 shrink-0"
                />

                <p className="text-xs leading-5 text-indigo-700">
                  Never share your password or OTP with
                  anyone. Use a strong password that you
                  don't use on other websites.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;
