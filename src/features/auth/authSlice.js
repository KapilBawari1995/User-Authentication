import { createSlice } from "@reduxjs/toolkit";

// ================= INITIAL DATA =================

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

// ================= AUTH SLICE =================

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: user || null,
    token: token || null,

    role: user?.role || null,
    permissions: user?.role?.permissions || [],
    isSuperAdmin: user?.isSuperAdmin || false,

    // ================= SIGNUP =================

    signupLoading: false,
    signupSuccess: false,
    signupError: null,

    // ================= VERIFY OTP =================

    verifyLoading: false,
    verifySuccess: false,
    verifyError: null,

    // ================= LOGIN =================

    loginLoading: false,
    loginSuccess: false,
    loginError: null,

    // ================= FORGOT PASSWORD =================

    forgotLoading: false,
    forgotSuccess: false,
    forgotError: null,

    // ================= VERIFY FORGOT OTP =================

    verifyForgotOtpLoading: false,
    verifyForgotOtpSuccess: false,
    verifyForgotOtpError: null,

    // ================= CHANGE PASSWORD =================

    changePassLoading: false,
    changePassOtpSent: false,
    changePassSuccess: false,
    changePassError: null,

    // ================= CREATE PASSWORD =================

    createPasswordLoading: false,
    createPasswordSuccess: false,
    createPasswordError: null,

    // ================= LOGOUT =================

    logoutLoading: false,
    logoutSuccess: false,
    logoutError: null,
  },

  reducers: {
    // =====================================================
    // SIGNUP
    // =====================================================

    signupRequest: (state) => {
      state.signupLoading = true;
      state.signupSuccess = false;
      state.signupError = null;
    },

    signupSuccess: (state) => {
      state.signupLoading = false;
      state.signupSuccess = true;
    },

    signupFailure: (state, action) => {
      state.signupLoading = false;
      state.signupError = action.payload;
    },

    clearSignupState: (state) => {
      state.signupSuccess = false;
      state.signupError = null;
    },

    // =====================================================
    // VERIFY OTP
    // =====================================================

    verifyOtpRequest: (state) => {
      state.verifyLoading = true;
      state.verifySuccess = false;
      state.verifyError = null;
    },

    verifyOtpSuccess: (state, action) => {
      state.verifyLoading = false;
      state.verifySuccess = true;

      state.token = action.payload.token;
      state.user = action.payload.user;

      state.role = action.payload.user?.role || null;

      state.permissions =
        action.payload.user?.role?.permissions || [];

      state.isSuperAdmin =
        action.payload.user?.isSuperAdmin || false;
    },

    verifyOtpFailure: (state, action) => {
      state.verifyLoading = false;
      state.verifyError = action.payload;
    },

    clearVerifyState: (state) => {
      state.verifySuccess = false;
      state.verifyError = null;
    },

    // =====================================================
    // LOGIN
    // =====================================================

    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginSuccess = false;
      state.loginError = null;
    },

    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.loginSuccess = true;

      state.token = action.payload.token;
      state.user = action.payload.user;

      state.role =
        action.payload.user?.role || null;

      state.permissions =
        action.payload.user?.role?.permissions || [];

      state.isSuperAdmin =
        action.payload.user?.isSuperAdmin || false;

      localStorage.setItem(
        "token",
        action.payload.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
    },

    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },

    clearLoginState: (state) => {
      state.loginSuccess = false;
      state.loginError = null;
    },

    // =====================================================
    // FORGOT PASSWORD
    // =====================================================

    forgotPasswordRequest: (state) => {
      state.forgotLoading = true;
      state.forgotSuccess = false;
      state.forgotError = null;
    },

    forgotPasswordSuccess: (state) => {
      state.forgotLoading = false;
      state.forgotSuccess = true;
    },

    forgotPasswordFailure: (state, action) => {
      state.forgotLoading = false;
      state.forgotError = action.payload;
    },

    // =====================================================
    // VERIFY FORGOT PASSWORD OTP
    // =====================================================

    verifyForgotPasswordOtpRequest: (state) => {
      state.verifyForgotOtpLoading = true;
      state.verifyForgotOtpSuccess = false;
      state.verifyForgotOtpError = null;
    },

    verifyForgotPasswordOtpSuccess: (state) => {
      state.verifyForgotOtpLoading = false;
      state.verifyForgotOtpSuccess = true;
    },

    verifyForgotPasswordOtpFailure: (state, action) => {
      state.verifyForgotOtpLoading = false;
      state.verifyForgotOtpError = action.payload;
    },

    clearVerifyForgotPasswordOtpState: (state) => {
      state.verifyForgotOtpLoading = false;
      state.verifyForgotOtpSuccess = false;
      state.verifyForgotOtpError = null;
    },

    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    sendChangePasswordOtpRequest: (state) => {
      state.changePassLoading = true;
      state.changePassOtpSent = false;
      state.changePassError = null;
    },

    sendChangePasswordOtpSuccess: (state) => {
      state.changePassLoading = false;
      state.changePassOtpSent = true;
    },

    sendChangePasswordOtpFailure: (state, action) => {
      state.changePassLoading = false;
      state.changePassError = action.payload;
    },

    verifyAndChangePasswordRequest: (state) => {
      state.changePassLoading = true;
      state.changePassSuccess = false;
      state.changePassError = null;
    },

    verifyAndChangePasswordSuccess: (state) => {
      state.changePassLoading = false;
      state.changePassSuccess = true;
      state.changePassOtpSent = false;

      if (state.user) {
        state.user.mustChangePassword = false;

        localStorage.setItem(
          "user",
          JSON.stringify(state.user)
        );
      }
    },

    verifyAndChangePasswordFailure: (state, action) => {
      state.changePassLoading = false;
      state.changePassError = action.payload;
    },

    clearChangePasswordState: (state) => {
      state.changePassOtpSent = false;
      state.changePassSuccess = false;
      state.changePassError = null;
    },

    // =====================================================
    // CREATE NEW PASSWORD
    // =====================================================

    createNewPasswordRequest: (state) => {
      state.createPasswordLoading = true;
      state.createPasswordSuccess = false;
      state.createPasswordError = null;
    },

    createNewPasswordSuccess: (state) => {
      state.createPasswordLoading = false;
      state.createPasswordSuccess = true;
    },

    createNewPasswordFailure: (state, action) => {
      state.createPasswordLoading = false;
      state.createPasswordError = action.payload;
    },

    clearCreateNewPasswordState: (state) => {
      state.createPasswordLoading = false;
      state.createPasswordSuccess = false;
      state.createPasswordError = null;
    },

    // =====================================================
    // LOGOUT
    // =====================================================

    logoutRequest: (state) => {
      state.logoutLoading = true;
      state.logoutSuccess = false;
      state.logoutError = null;
    },

    logoutSuccess: (state) => {
      state.logoutLoading = false;
      state.logoutSuccess = true;
      state.logoutError = null;

      state.user = null;
      state.token = null;
      state.role = null;
      state.permissions = [];
      state.isSuperAdmin = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    logoutFailure: (state, action) => {
      state.logoutLoading = false;
      state.logoutSuccess = false;
      state.logoutError = action.payload;
    },

    clearLogoutState: (state) => {
      state.logoutSuccess = false;
      state.logoutError = null;
    },
  },
});

// ================= EXPORT ACTIONS =================

export const {
  // Signup
  signupRequest,
  signupSuccess,
  signupFailure,
  clearSignupState,

  // Verify OTP
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  clearVerifyState,

  // Login
  loginRequest,
  loginSuccess,
  loginFailure,
  clearLoginState,

  // Forgot Password
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  // Verify Forgot Password OTP
  verifyForgotPasswordOtpRequest,
  verifyForgotPasswordOtpSuccess,
  verifyForgotPasswordOtpFailure,
  clearVerifyForgotPasswordOtpState,

  // Change Password
  sendChangePasswordOtpRequest,
  sendChangePasswordOtpSuccess,
  sendChangePasswordOtpFailure,

  verifyAndChangePasswordRequest,
  verifyAndChangePasswordSuccess,
  verifyAndChangePasswordFailure,
  clearChangePasswordState,

  // Create New Password
  createNewPasswordRequest,
  createNewPasswordSuccess,
  createNewPasswordFailure,
  clearCreateNewPasswordState,

  // Logout
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  clearLogoutState,
} = authSlice.actions;

export default authSlice.reducer;