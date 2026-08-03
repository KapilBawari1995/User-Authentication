import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,

        signupLoading: false,
        signupSuccess: false,
        signupError: null,

        verifyLoading: false,
        verifySuccess: false,
        verifyError: null,

        loginLoading: false,
        loginSuccess: false,
        loginError: null,

        forgotLoading: false,
        forgotSuccess: false,
        forgotError: null,

        verifyForgotOtpLoading: false,
        verifyForgotOtpSuccess: false,
        verifyForgotOtpError: null,


        verifyOtpLoading: false,
        verifyOtpSuccess: false,
        verifyOtpError: null,

        changePassLoading: false,
        changePassOtpSent: false,
        changePassSuccess: false,
        changePassError: null,


        createPasswordLoading: false,
        createPasswordSuccess: false,
        createPasswordError: null,
    },
    reducers: {
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
        },
        verifyOtpFailure: (state, action) => {
            state.verifyLoading = false;
            state.verifyError = action.payload;
        },

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




        clearVerifyState: (state) => {
            state.verifySuccess = false;
            state.verifyError = null;
        },



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
        },
        loginFailure: (state, action) => {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        clearLoginState: (state) => {
            state.loginSuccess = false;
            state.loginError = null;
        },



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
        },
        verifyAndChangePasswordFailure: (state, action) => {
            state.changePassLoading = false;
            state.changePassError = action.payload;
        },


        clearForgotPasswordState: (state) => {
            state.forgotLoading = false;
            state.forgotSuccess = false;
            state.forgotError = null;
        },


        clearChangePasswordState: (state) => {
            state.changePassOtpSent = false;
            state.changePassSuccess = false;
            state.changePassError = null;
        },



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



        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }
    },
});

export const {
    signupRequest,
    signupSuccess,
    signupFailure,
    clearSignupState,

    verifyOtpRequest,
    verifyOtpSuccess,
    verifyOtpFailure,
    clearVerifyState,

    loginRequest,
    loginSuccess,
    loginFailure,
    clearLoginState,

    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,

    sendChangePasswordOtpRequest,
    sendChangePasswordOtpSuccess,
    sendChangePasswordOtpFailure,

    verifyAndChangePasswordRequest,
    verifyAndChangePasswordSuccess,
    verifyAndChangePasswordFailure,
    clearChangePasswordState,


    verifyForgotPasswordOtpRequest,
    verifyForgotPasswordOtpSuccess,
    verifyForgotPasswordOtpFailure,
    clearVerifyForgotPasswordOtpState,


    createNewPasswordRequest,
    createNewPasswordSuccess,
    createNewPasswordFailure,
    clearCreateNewPasswordState,


    logout,
} = authSlice.actions;

export default authSlice.reducer;