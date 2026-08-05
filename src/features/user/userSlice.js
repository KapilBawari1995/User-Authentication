import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        // ================= ADD USER =================
        createUserLoading: false,
        createUserSuccess: false,
        createUserError: null,
        users: [],
        getUsersLoading: false,
        getUsersError: null,
    },

    reducers: {

        // ================= CREATE USER =================

        createUserRequest: (state) => {
            state.createUserLoading = true;
            state.createUserSuccess = false;
            state.createUserError = null;
        },

        createUserSuccess: (state) => {
            state.createUserLoading = false;
            state.createUserSuccess = true;
            state.createUserError = null;
        },

        createUserFailure: (state, action) => {
            state.createUserLoading = false;
            state.createUserSuccess = false;
            state.createUserError = action.payload;
        },

        clearCreateUserState: (state) => {
            state.createUserLoading = false;
            state.createUserSuccess = false;
            state.createUserError = null;
        },



        // ================= GET USERS =================

        getUsersRequest: (state) => {
            state.getUsersLoading = true;
            state.getUsersError = null;
        },

        getUsersSuccess: (state, action) => {
            state.getUsersLoading = false;
            state.users = action.payload;
        },

        getUsersFailure: (state, action) => {
            state.getUsersLoading = false;
            state.getUsersError = action.payload;
        },

    },
});

export const {
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    clearCreateUserState,
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;