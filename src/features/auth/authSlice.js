import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token")
const authSlice = createSlice({
    
    name: "auth",

    initialState: {
    user: user || null,
    token: token || null,

    role: user?.role || null,
    permissions: user?.role?.permissions || [],
    isSuperAdmin: user?.isSuperAdmin || false,


        // Signup
        signupLoading: false,
        signupSuccess: false,
        signupError: null,


        // Verify OTP
        verifyLoading: false,
        verifySuccess: false,
        verifyError: null,


        // Login
        loginLoading: false,
        loginSuccess: false,
        loginError: null,


        // Forgot Password
        forgotLoading: false,
        forgotSuccess: false,
        forgotError: null,


        // Verify Forgot OTP
        verifyForgotOtpLoading: false,
        verifyForgotOtpSuccess: false,
        verifyForgotOtpError: null,


        // Change Password
        changePassLoading: false,
        changePassOtpSent: false,
        changePassSuccess: false,
        changePassError: null,


        // Create Password
        createPasswordLoading: false,
        createPasswordSuccess: false,
        createPasswordError: null,
    },


    reducers: {


        // ================= SIGNUP =================

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



        // ================= VERIFY OTP =================

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




        // ================= LOGIN =================

        loginRequest: (state) => {
            state.loginLoading = true;
            state.loginSuccess = false;
            state.loginError = null;
        },


        loginSuccess: (state, action) => {

            console.log("LOGIN PAYLOAD:", action.payload);


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


                    localStorage.setItem("token", action.payload.token);
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





        // ================= FORGOT PASSWORD =================

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





        // ================= VERIFY FORGOT OTP =================


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





        // ================= CHANGE PASSWORD =================


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


        clearChangePasswordState: (state) => {
            state.changePassOtpSent = false;
            state.changePassSuccess = false;
            state.changePassError = null;
        },





        // ================= CREATE NEW PASSWORD =================


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





        // ================= LOGOUT =================


        logout: (state) => {

            state.user = null;
            state.token = null;

            state.role = null;
            state.permissions = [];
            state.isSuperAdmin = false;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }

    }

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


    verifyForgotPasswordOtpRequest,
    verifyForgotPasswordOtpSuccess,
    verifyForgotPasswordOtpFailure,
    clearVerifyForgotPasswordOtpState,


    sendChangePasswordOtpRequest,
    sendChangePasswordOtpSuccess,
    sendChangePasswordOtpFailure,


    verifyAndChangePasswordRequest,
    verifyAndChangePasswordSuccess,
    verifyAndChangePasswordFailure,
    clearChangePasswordState,


    createNewPasswordRequest,
    createNewPasswordSuccess,
    createNewPasswordFailure,
    clearCreateNewPasswordState,


    logout

} = authSlice.actions;



export default authSlice.reducer;