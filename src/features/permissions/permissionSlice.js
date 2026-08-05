import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: [],
  loading: false,
  success: false,
  error: null,

  saveLoading: false,
  saveSuccess: false,
  saveError: null,
};

const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    // ================= Get Permissions =================

    getPermissionsRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },

    getPermissionsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.permissions = action.payload;
    },

    getPermissionsFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // ================= Assign Permissions =================

    assignPermissionRequest: (state) => {
      state.saveLoading = true;
      state.saveSuccess = false;
      state.saveError = null;
    },

    assignPermissionSuccess: (state) => {
      state.saveLoading = false;
      state.saveSuccess = true;
    },

    assignPermissionFailure: (state, action) => {
      state.saveLoading = false;
      state.saveSuccess = false;
      state.saveError = action.payload;
    },

    // ================= Reset =================

    resetPermissionState: (state) => {
      state.success = false;
      state.error = null;

      state.saveSuccess = false;
      state.saveError = null;
    },
  },
});

export const {
  getPermissionsRequest,
  getPermissionsSuccess,
  getPermissionsFailure,

  assignPermissionRequest,
  assignPermissionSuccess,
  assignPermissionFailure,

  resetPermissionState,
} = permissionSlice.actions;

export default permissionSlice.reducer;