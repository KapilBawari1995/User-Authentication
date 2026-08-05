import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  role: null,

  loading: false,
  error: null,

  createLoading: false,
  createSuccess: false,
  createError: null,

  updateLoading: false,
  updateSuccess: false,
  updateError: null,

  deleteLoading: false,
  deleteSuccess: false,
  deleteError: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,

  reducers: {
    // ================= GET ROLES =================

    getRolesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getRolesSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    },

    getRolesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ================= CREATE ROLE =================

    createRoleRequest: (state) => {
      state.createLoading = true;
      state.createSuccess = false;
      state.createError = null;
    },

    createRoleSuccess: (state) => {
      state.createLoading = false;
      state.createSuccess = true;
    },

    createRoleFailure: (state, action) => {
      state.createLoading = false;
      state.createError = action.payload;
    },

    // ================= UPDATE ROLE =================

    updateRoleRequest: (state) => {
      state.updateLoading = true;
      state.updateSuccess = false;
      state.updateError = null;
    },

    updateRoleSuccess: (state) => {
      state.updateLoading = false;
      state.updateSuccess = true;
    },

    updateRoleFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },

    // ================= DELETE ROLE =================

    deleteRoleRequest: (state) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.deleteError = null;
    },

    deleteRoleSuccess: (state) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
    },

    deleteRoleFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },

    // ================= CLEAR =================

    clearRoleState: (state) => {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;

      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
      state.error = null;
    },
  },
});

export const {
  getRolesRequest,
  getRolesSuccess,
  getRolesFailure,

  createRoleRequest,
  createRoleSuccess,
  createRoleFailure,

  updateRoleRequest,
  updateRoleSuccess,
  updateRoleFailure,

  deleteRoleRequest,
  deleteRoleSuccess,
  deleteRoleFailure,

  clearRoleState,
} = roleSlice.actions;

export default roleSlice.reducer;