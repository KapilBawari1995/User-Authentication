
import { createSlice } from "@reduxjs/toolkit";

// ================= INITIAL DATA =================

const storedUser = JSON.parse(
  localStorage.getItem("user")
);

const storedToken = localStorage.getItem("token");

// ================= AUTH SLICE =================

const authSlice = createSlice({
  name: "auth",

  initialState: {
    // =====================================================
    // USER / AUTH
    // =====================================================

    user: storedUser || null,
    token: storedToken || null,

    // =====================================================
    // ROLE / PERMISSIONS
    // =====================================================

    role: storedUser?.role || null,

    permissions:
      storedUser?.role?.permissions || [],

    isSuperAdmin:
      Boolean(storedUser?.isSuperAdmin),

    // =====================================================
    // SIGNUP
    // =====================================================

    signupLoading: false,
    signupSuccess: false,
    signupError: null,

    // =====================================================
    // VERIFY OTP
    // =====================================================

    verifyLoading: false,
    verifySuccess: false,
    verifyError: null,

    // =====================================================
    // LOGIN
    // =====================================================

    loginLoading: false,
    loginSuccess: false,
    loginError: null,

    // =====================================================
    // FORGOT PASSWORD
    // =====================================================

    forgotLoading: false,
    forgotSuccess: false,
    forgotError: null,

    // =====================================================
    // VERIFY FORGOT PASSWORD OTP
    // =====================================================

    verifyForgotOtpLoading: false,
    verifyForgotOtpSuccess: false,
    verifyForgotOtpError: null,

    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    changePassLoading: false,
    changePassOtpSent: false,
    changePassSuccess: false,
    changePassError: null,

    // =====================================================
    // CREATE NEW PASSWORD
    // =====================================================

    createPasswordLoading: false,
    createPasswordSuccess: false,
    createPasswordError: null,

    // =====================================================
    // LOGOUT
    // =====================================================

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
      state.signupError = null;
    },

    signupFailure: (state, action) => {
      state.signupLoading = false;
      state.signupSuccess = false;
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
      state.verifyError = null;

      // ================= USER =================

      state.token =
        action.payload?.token || null;

      state.user =
        action.payload?.user || null;

      // ================= ROLE =================

      state.role =
        action.payload?.user?.role || null;

      // ================= PERMISSIONS =================

      state.permissions =
        action.payload?.user?.role?.permissions || [];

      // ================= SUPER ADMIN =================

      state.isSuperAdmin =
        Boolean(
          action.payload?.user?.isSuperAdmin
        );

      // ================= LOCAL STORAGE =================

      if (action.payload?.token) {
        localStorage.setItem(
          "token",
          action.payload.token
        );
      }

      if (action.payload?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      }
    },

    verifyOtpFailure: (state, action) => {
      state.verifyLoading = false;
      state.verifySuccess = false;
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
      state.loginError = null;

      // ================= TOKEN =================

      state.token =
        action.payload?.token || null;

      // ================= USER =================

      state.user =
        action.payload?.user || null;

      // ================= ROLE =================

      state.role =
        action.payload?.user?.role || null;

      // ================= PERMISSIONS =================

      state.permissions =
        action.payload?.user?.role?.permissions || [];

      // ================= SUPER ADMIN =================

      state.isSuperAdmin =
        Boolean(
          action.payload?.user?.isSuperAdmin
        );

      // ================= LOCAL STORAGE =================

      if (action.payload?.token) {
        localStorage.setItem(
          "token",
          action.payload.token
        );
      }

      if (action.payload?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      }
    },

    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginSuccess = false;
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
      state.forgotError = null;
    },

    forgotPasswordFailure: (state, action) => {
      state.forgotLoading = false;
      state.forgotSuccess = false;
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
      state.verifyForgotOtpError = null;
    },

    verifyForgotPasswordOtpFailure: (
      state,
      action
    ) => {
      state.verifyForgotOtpLoading = false;
      state.verifyForgotOtpSuccess = false;
      state.verifyForgotOtpError =
        action.payload;
    },

    clearVerifyForgotPasswordOtpState: (
      state
    ) => {
      state.verifyForgotOtpLoading = false;
      state.verifyForgotOtpSuccess = false;
      state.verifyForgotOtpError = null;
    },

    // =====================================================
    // SEND CHANGE PASSWORD OTP
    // =====================================================

    sendChangePasswordOtpRequest: (state) => {
      state.changePassLoading = true;
      state.changePassOtpSent = false;
      state.changePassError = null;
    },

    sendChangePasswordOtpSuccess: (state) => {
      state.changePassLoading = false;
      state.changePassOtpSent = true;
      state.changePassError = null;
    },

    sendChangePasswordOtpFailure: (
      state,
      action
    ) => {
      state.changePassLoading = false;
      state.changePassOtpSent = false;
      state.changePassError =
        action.payload;
    },

    // =====================================================
    // VERIFY AND CHANGE PASSWORD
    // =====================================================

    verifyAndChangePasswordRequest: (
      state
    ) => {
      state.changePassLoading = true;
      state.changePassSuccess = false;
      state.changePassError = null;
    },

    verifyAndChangePasswordSuccess: (
      state
    ) => {
      state.changePassLoading = false;
      state.changePassSuccess = true;
      state.changePassOtpSent = false;
      state.changePassError = null;

      // Update current user
      if (state.user) {
        state.user.mustChangePassword = false;

        localStorage.setItem(
          "user",
          JSON.stringify(state.user)
        );
      }
    },

    verifyAndChangePasswordFailure: (
      state,
      action
    ) => {
      state.changePassLoading = false;
      state.changePassSuccess = false;
      state.changePassError =
        action.payload;
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
      state.createPasswordError = null;
    },

    createNewPasswordFailure: (
      state,
      action
    ) => {
      state.createPasswordLoading = false;
      state.createPasswordSuccess = false;
      state.createPasswordError =
        action.payload;
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

      // ================= CLEAR USER =================

      state.user = null;

      // ================= CLEAR TOKEN =================

      state.token = null;

      // ================= CLEAR ROLE =================

      state.role = null;

      // ================= CLEAR PERMISSIONS =================

      state.permissions = [];

      // ================= CLEAR SUPER ADMIN =================

      state.isSuperAdmin = false;

      // ================= LOCAL STORAGE =================

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

// =====================================================
// EXPORT ACTIONS
// =====================================================

export const {
  // ================= SIGNUP =================

  signupRequest,
  signupSuccess,
  signupFailure,
  clearSignupState,

  // ================= VERIFY OTP =================

  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  clearVerifyState,

  // ================= LOGIN =================

  loginRequest,
  loginSuccess,
  loginFailure,
  clearLoginState,

  // ================= FORGOT PASSWORD =================

  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  // ================= VERIFY FORGOT PASSWORD OTP =================

  verifyForgotPasswordOtpRequest,
  verifyForgotPasswordOtpSuccess,
  verifyForgotPasswordOtpFailure,
  clearVerifyForgotPasswordOtpState,

  // ================= CHANGE PASSWORD =================

  sendChangePasswordOtpRequest,
  sendChangePasswordOtpSuccess,
  sendChangePasswordOtpFailure,

  verifyAndChangePasswordRequest,
  verifyAndChangePasswordSuccess,
  verifyAndChangePasswordFailure,
  clearChangePasswordState,

  // ================= CREATE NEW PASSWORD =================

  createNewPasswordRequest,
  createNewPasswordSuccess,
  createNewPasswordFailure,
  clearCreateNewPasswordState,

  // ================= LOGOUT =================

  logoutRequest,
  logoutSuccess,
  logoutFailure,
  clearLogoutState,
} = authSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default authSlice.reducer;