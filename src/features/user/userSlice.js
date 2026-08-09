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
        user: null,
        updateUserLoading: false,
updateUserSuccess: false,
updateUserError: null,
deleteUserLoading: false,
deleteUserSuccess: false,
deleteUserError: null,
        
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

    


    // ================= GET USER BY ID =================

    getUserByIdRequest: (state) => {
        state.getUserLoading = true;
        state.getUserError = null;
        state.user = null;
    },

    getUserByIdSuccess: (state, action) => {
        state.getUserLoading = false;
        state.user = action.payload;
    },

    getUserByIdFailure: (state, action) => {
        state.getUserLoading = false;
        state.getUserError = action.payload;
    },


    // ================= DELETE USER =================

deleteUserRequest: (state) => {
  state.deleteUserLoading = true;
  state.deleteUserSuccess = false;
  state.deleteUserError = null;
},

deleteUserSuccess: (state) => {
  state.deleteUserLoading = false;
  state.deleteUserSuccess = true;
  state.deleteUserError = null;
},

deleteUserFailure: (state, action) => {
  state.deleteUserLoading = false;
  state.deleteUserSuccess = false;
  state.deleteUserError = action.payload;
},


    clearSingleUser: (state) => {
        state.user = null;
        state.getUserLoading = false;
        state.getUserError = null;
    },
    


    // ================= UPDATE USER =================

// ================= UPDATE USER =================

updateUserRequest: (state) => {
  state.updateUserLoading = true;
  state.updateUserSuccess = false;
  state.updateUserError = null;
},

updateUserSuccess: (state, action) => {
  state.updateUserLoading = false;
  state.updateUserSuccess = true;
  state.updateUserError = null;
  state.user = action.payload.data;
},

updateUserFailure: (state, action) => {
  state.updateUserLoading = false;
  state.updateUserSuccess = false;
  state.updateUserError = action.payload;
},


// ================= CLEAR USER STATE =================

clearUserState: (state) => {
  // Create
  state.createUserLoading = false;
  state.createUserSuccess = false;
  state.createUserError = null;

 
  // Get Single User
  state.getUserLoading = false;
  state.getUserError = null;
  state.user = null;

  // Update
  state.updateUserLoading = false;
  state.updateUserSuccess = false;
  state.updateUserError = null;






},
}

})

export const {
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    clearCreateUserState,

    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,

      getUserByIdRequest,
    getUserByIdSuccess,
    getUserByIdFailure,


    updateUserRequest,
  updateUserSuccess,
  updateUserFailure,

  deleteUserRequest,
deleteUserSuccess,
deleteUserFailure,
  
  clearUserState,

  
} = userSlice.actions;

export default userSlice.reducer;