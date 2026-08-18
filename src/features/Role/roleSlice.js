import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",

  initialState: {
    // =====================================================
    // ROLE LIST
    // =====================================================

    roles: [],
    totalCount: 0,

    getRolesLoading: false,
    getRolesSuccess: false,
    getRolesError: null,

    // =====================================================
    // GET ROLE BY ID
    // =====================================================

    role: null,

    getRoleByIdLoading: false,
    getRoleByIdSuccess: false,
    getRoleByIdError: null,

    // =====================================================
    // CREATE ROLE
    // =====================================================

    createLoading: false,
    createSuccess: false,
    createError: null,

    // =====================================================
    // UPDATE ROLE
    // =====================================================

    updateLoading: false,
    updateSuccess: false,
    updateError: null,

    // =====================================================
    // DELETE ROLE
    // =====================================================

    deleteLoading: false,
    deleteSuccess: false,
    deleteError: null,
  },

  reducers: {
    // =====================================================
    // GET ROLES
    // =====================================================

    getRolesRequest: (state) => {
      state.getRolesLoading = true;
      state.getRolesSuccess = false;
      state.getRolesError = null;
    },

    getRolesSuccess: (state, action) => {
      state.getRolesLoading = false;
      state.getRolesSuccess = true;
      state.getRolesError = null;

      /*
       * Supports:
       * {
       *   data: [],
       *   totalCount: 10
       * }
       */

      state.roles = action.payload?.data || [];
      state.totalCount =
        action.payload?.totalCount || 0;
    },

    getRolesFailure: (state, action) => {
      state.getRolesLoading = false;
      state.getRolesSuccess = false;
      state.getRolesError = action.payload;
    },

    // =====================================================
    // GET ROLE BY ID
    // =====================================================

    getRoleByIdRequest: (state) => {
      state.getRoleByIdLoading = true;
      state.getRoleByIdSuccess = false;
      state.getRoleByIdError = null;

      state.role = null;
    },

    getRoleByIdSuccess: (state, action) => {
      state.getRoleByIdLoading = false;
      state.getRoleByIdSuccess = true;
      state.getRoleByIdError = null;

      state.role = action.payload;
    },

    getRoleByIdFailure: (state, action) => {
      state.getRoleByIdLoading = false;
      state.getRoleByIdSuccess = false;
      state.getRoleByIdError = action.payload;
    },

    // =====================================================
    // CREATE ROLE
    // =====================================================

    createRoleRequest: (state) => {
      state.createLoading = true;
      state.createSuccess = false;
      state.createError = null;
    },

    createRoleSuccess: (state, action) => {
      state.createLoading = false;
      state.createSuccess = true;
      state.createError = null;

      if (action.payload) {
        state.roles.unshift(action.payload);
        state.totalCount += 1;
      }
    },

    createRoleFailure: (state, action) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = action.payload;
    },

    // =====================================================
    // UPDATE ROLE
    // =====================================================

    updateRoleRequest: (state) => {
      state.updateLoading = true;
      state.updateSuccess = false;
      state.updateError = null;
    },

    updateRoleSuccess: (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = true;
      state.updateError = null;

      const updatedRole = action.payload;

      if (!updatedRole?._id) {
        return;
      }

      const index = state.roles.findIndex(
        (item) =>
          item._id === updatedRole._id
      );

      if (index !== -1) {
        state.roles[index] = updatedRole;
      }

      state.role = updatedRole;
    },

    updateRoleFailure: (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = action.payload;
    },

    // =====================================================
    // DELETE ROLE
    // =====================================================

    deleteRoleRequest: (state) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.deleteError = null;
    },

    deleteRoleSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
      state.deleteError = null;

      state.roles = state.roles.filter(
        (item) =>
          item._id !== action.payload
      );

      if (state.totalCount > 0) {
        state.totalCount -= 1;
      }
    },

    deleteRoleFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = action.payload;
    },

    // =====================================================
    // CLEAR ROLE STATE
    // =====================================================

    clearRoleState: (state) => {
      // GET ROLES
      state.getRolesLoading = false;
      state.getRolesSuccess = false;
      state.getRolesError = null;

      // GET ROLE BY ID
      state.getRoleByIdLoading = false;
      state.getRoleByIdSuccess = false;
      state.getRoleByIdError = null;

      // ROLE
      state.role = null;

      // CREATE
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = null;

      // UPDATE
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;

      // DELETE
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = null;
    },
  },
});

export const {
  // GET ROLES
  getRolesRequest,
  getRolesSuccess,
  getRolesFailure,

  // GET ROLE BY ID
  getRoleByIdRequest,
  getRoleByIdSuccess,
  getRoleByIdFailure,

  // CREATE
  createRoleRequest,
  createRoleSuccess,
  createRoleFailure,

  // UPDATE
  updateRoleRequest,
  updateRoleSuccess,
  updateRoleFailure,

  // DELETE
  deleteRoleRequest,
  deleteRoleSuccess,
  deleteRoleFailure,

  // CLEAR
  clearRoleState,
} = roleSlice.actions;

export default roleSlice.reducer;