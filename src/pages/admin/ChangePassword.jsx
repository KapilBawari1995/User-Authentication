import React, { useEffect, useState } from "react";
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

import ChangePasswordOtpModal from "./ChangePasswordOtpModal";

const ChangePassword = () => {
  const dispatch = useDispatch();

  const {
    changePassLoading = false,
    changePassOtpSent = false,
    changePassSuccess = false,
    changePassError = null,
    changePassOtpLoading = false,
  } = useSelector((state) => state.auth || {});

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [otpModalOpen, setOtpModalOpen] =
    useState(false);

  const [otp, setOtp] = useState("");

  /* =====================================================
     PASSWORD TOGGLE
  ===================================================== */

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(
      "Current Password is required"
    ),

    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Minimum 8 characters")
      .matches(
        /[A-Z]/,
        "One uppercase letter required"
      )
      .matches(
        /[a-z]/,
        "One lowercase letter required"
      )
      .matches(
        /[0-9]/,
        "One number required"
      )
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
  });

  /* =====================================================
     FORMIK
  ===================================================== */

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: (values) => {
      dispatch(
        sendChangePasswordOtpRequest({
          data: {
            oldPassword: values.currentPassword,
          },
        })
      );
    },
  });

  /* =====================================================
     OTP SENT
  ===================================================== */

  useEffect(() => {
    if (changePassOtpSent) {
      setOtpModalOpen(true);
    }
  }, [changePassOtpSent]);

  /* =====================================================
     SUCCESS
  ===================================================== */

  useEffect(() => {
    if (!changePassSuccess) return;

    setOtpModalOpen(false);
    setOtp("");

    formik.resetForm();

    setShowPassword({
      current: false,
      new: false,
      confirm: false,
    });

    dispatch(clearChangePasswordState());
  }, [changePassSuccess]);

  /* =====================================================
     VERIFY OTP
  ===================================================== */

  const handleVerifyOtp = () => {
    if (otp.length !== 6) return;

    dispatch(
      verifyAndChangePasswordRequest({
        data: {
          otp,
          newPassword: formik.values.newPassword,
        },
      })
    );
  };

  /* =====================================================
     RESEND OTP
  ===================================================== */

  const handleResendOtp = () => {
    dispatch(
      sendChangePasswordOtpRequest({
        data: {
          oldPassword:
            formik.values.currentPassword,
        },
      })
    );
  };

  /* =====================================================
     CLOSE OTP MODAL
  ===================================================== */

  const handleCloseOtpModal = () => {
    setOtpModalOpen(false);
    setOtp("");

    dispatch(clearChangePasswordState());
  };

  /* =====================================================
     CANCEL
  ===================================================== */

  const handleCancel = () => {
    formik.resetForm();

    setOtp("");
    setOtpModalOpen(false);

    setShowPassword({
      current: false,
      new: false,
      confirm: false,
    });

    dispatch(clearChangePasswordState());
  };

  return (
    <div
      className="
        min-h-full
        text-slate-800
        dark:text-slate-100
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-600
              text-white
              shadow-lg
              shadow-indigo-200
              dark:shadow-none
              flex
              items-center
              justify-center
            "
          >
            <ShieldCheck size={27} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-slate-800
                dark:text-white
                tracking-tight
              "
            >
              Change Password
            </h1>

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
                mt-1
              "
            >
              Update your account password securely.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {changePassError && (
        <div
          className="
            mb-6
            p-4
            rounded-xl
            border
            border-red-200
            dark:border-red-500/20
            bg-red-50
            dark:bg-red-500/10
            text-red-600
            dark:text-red-400
            text-sm
          "
        >
          {changePassError}
        </div>
      )}

      {/* =================================================
          MAIN
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* =================================================
            FORM CARD
        ================================================= */}

        <div
          className="
            xl:col-span-2
            bg-white
            dark:bg-slate-900
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-700
            shadow-sm
            dark:shadow-none
            overflow-hidden
          "
        >
          {/* CARD HEADER */}

          <div
            className="
              px-6 py-5
              border-b
              border-slate-200
              dark:border-slate-700
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-indigo-50
                dark:bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
                flex
                items-center
                justify-center
              "
            >
              <KeyRound size={20} />
            </div>

            <div>
              <h2
                className="
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Password Security
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                  mt-1
                "
              >
                Enter your current and new password.
              </p>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={formik.handleSubmit}
            className="p-6 space-y-5"
          >
            {/* CURRENT PASSWORD */}

            <div>
              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                  mb-2
                "
              >
                <Lock
                  size={16}
                  className="
                    text-indigo-500
                    dark:text-indigo-400
                  "
                />

                Current Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword.current
                      ? "text"
                      : "password"
                  }
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={
                    formik.values.currentPassword
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                  className={`
                    w-full
                    h-12
                    px-4
                    pr-12
                    rounded-xl
                    border
                    bg-slate-50
                    dark:bg-slate-800
                    text-sm
                    text-slate-700
                    dark:text-slate-200
                    placeholder:text-slate-400
                    dark:placeholder:text-slate-500
                    outline-none
                    transition
                    focus:bg-white
                    dark:focus:bg-slate-900
                    focus:ring-4
                    ${
                      formik.touched.currentPassword &&
                      formik.errors.currentPassword
                        ? `
                          border-red-300
                          dark:border-red-500/40
                          focus:border-red-400
                          focus:ring-red-500/10
                        `
                        : `
                          border-slate-200
                          dark:border-slate-700
                          focus:border-indigo-400
                          focus:ring-indigo-500/10
                        `
                    }
                  `}
                />

                <button
                  type="button"
                  onMouseDown={(e) =>
                    e.preventDefault()
                  }
                  onClick={() =>
                    togglePassword("current")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-8 h-8
                    rounded-lg
                    text-slate-400
                    dark:text-slate-500
                    hover:text-indigo-600
                    dark:hover:text-indigo-400
                    hover:bg-indigo-50
                    dark:hover:bg-indigo-500/10
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  {showPassword.current ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {formik.touched.currentPassword &&
                formik.errors.currentPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.currentPassword}
                  </p>
                )}
            </div>

            {/* NEW PASSWORD */}

            <div>
              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                  mb-2
                "
              >
                <Lock
                  size={16}
                  className="
                    text-indigo-500
                    dark:text-indigo-400
                  "
                />

                New Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword.new
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  placeholder="Enter new password"
                  value={
                    formik.values.newPassword
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
                  className={`
                    w-full
                    h-12
                    px-4
                    pr-12
                    rounded-xl
                    border
                    bg-slate-50
                    dark:bg-slate-800
                    text-sm
                    text-slate-700
                    dark:text-slate-200
                    placeholder:text-slate-400
                    dark:placeholder:text-slate-500
                    outline-none
                    transition
                    focus:bg-white
                    dark:focus:bg-slate-900
                    focus:ring-4
                    ${
                      formik.touched.newPassword &&
                      formik.errors.newPassword
                        ? `
                          border-red-300
                          dark:border-red-500/40
                          focus:border-red-400
                          focus:ring-red-500/10
                        `
                        : `
                          border-slate-200
                          dark:border-slate-700
                          focus:border-indigo-400
                          focus:ring-indigo-500/10
                        `
                    }
                  `}
                />

                <button
                  type="button"
                  onMouseDown={(e) =>
                    e.preventDefault()
                  }
                  onClick={() =>
                    togglePassword("new")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-8 h-8
                    rounded-lg
                    text-slate-400
                    dark:text-slate-500
                    hover:text-indigo-600
                    dark:hover:text-indigo-400
                    hover:bg-indigo-50
                    dark:hover:bg-indigo-500/10
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  {showPassword.new ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {formik.touched.newPassword &&
                formik.errors.newPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.newPassword}
                  </p>
                )}
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                  mb-2
                "
              >
                <Lock
                  size={16}
                  className="
                    text-indigo-500
                    dark:text-indigo-400
                  "
                />

                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword.confirm
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={
                    formik.values.confirmPassword
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
                  className={`
                    w-full
                    h-12
                    px-4
                    pr-12
                    rounded-xl
                    border
                    bg-slate-50
                    dark:bg-slate-800
                    text-sm
                    text-slate-700
                    dark:text-slate-200
                    placeholder:text-slate-400
                    dark:placeholder:text-slate-500
                    outline-none
                    transition
                    focus:bg-white
                    dark:focus:bg-slate-900
                    focus:ring-4
                    ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? `
                          border-red-300
                          dark:border-red-500/40
                          focus:border-red-400
                          focus:ring-red-500/10
                        `
                        : `
                          border-slate-200
                          dark:border-slate-700
                          focus:border-indigo-400
                          focus:ring-indigo-500/10
                        `
                    }
                  `}
                />

                <button
                  type="button"
                  onMouseDown={(e) =>
                    e.preventDefault()
                  }
                  onClick={() =>
                    togglePassword("confirm")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-8 h-8
                    rounded-lg
                    text-slate-400
                    dark:text-slate-500
                    hover:text-indigo-600
                    dark:hover:text-indigo-400
                    hover:bg-indigo-50
                    dark:hover:bg-indigo-500/10
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  {showPassword.confirm ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* BUTTONS */}

            <div
              className="
                pt-4
                border-t
                border-slate-100
                dark:border-slate-800
                flex
                flex-col
                sm:flex-row
                justify-end
                gap-3
              "
            >
              <button
                type="button"
                onClick={handleCancel}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  h-11
                  px-5
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  text-slate-600
                  dark:text-slate-300
                  text-sm
                  font-semibold
                  hover:bg-slate-50
                  dark:hover:bg-slate-700
                  transition
                "
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={changePassLoading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  h-11
                  px-6
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  disabled:bg-slate-400
                  text-white
                  text-sm
                  font-semibold
                  transition
                "
              >
                <Save size={17} />

                {changePassLoading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>
            </div>
          </form>
        </div>

        {/* =================================================
            REQUIREMENTS
        ================================================= */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-700
            shadow-sm
            dark:shadow-none
            overflow-hidden
            h-fit
          "
        >
          <div
            className="
              px-6 py-5
              border-b
              border-slate-200
              dark:border-slate-700
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-10 h-10
                  rounded-xl
                  bg-emerald-50
                  dark:bg-emerald-500/10
                  text-emerald-600
                  dark:text-emerald-400
                  flex
                  items-center
                  justify-center
                "
              >
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h2
                  className="
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Password Requirements
                </h2>

                <p
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                    mt-1
                  "
                >
                  Keep your account secure.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {[
                "Minimum 8 characters",
                "One uppercase letter",
                "One lowercase letter",
                "One number",
                "One special character",
              ].map((text) => (
                <div
                  key={text}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />

                  <span
                    className="
                      text-sm
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="
                mt-6
                p-4
                rounded-xl
                bg-indigo-50
                dark:bg-indigo-500/10
                border
                border-indigo-100
                dark:border-indigo-500/20
              "
            >
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="
                    text-indigo-600
                    dark:text-indigo-400
                    shrink-0
                  "
                />

                <p
                  className="
                    text-xs
                    leading-5
                    text-indigo-700
                    dark:text-indigo-300
                  "
                >
                  Never share your password or OTP with
                  anyone. Use a strong password that you
                  don't use on other websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          OTP MODAL
      ================================================= */}

      <ChangePasswordOtpModal
        open={otpModalOpen}
        otp={otp}
        setOtp={setOtp}
        loading={changePassLoading}
        resendLoading={changePassOtpLoading}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        onClose={handleCloseOtpModal}
      />
    </div>
  );
};

export default ChangePassword;