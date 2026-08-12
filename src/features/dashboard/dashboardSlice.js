import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboard: null,
  dashboardType: null,

  getDashboardLoading: false,
  getDashboardSuccess: false,
  getDashboardError: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    // ================= GET DASHBOARD =================

    getDashboardRequest: (state) => {
      state.getDashboardLoading = true;
      state.getDashboardSuccess = false;
      state.getDashboardError = null;
    },

    getDashboardSuccess: (state, action) => {
      state.getDashboardLoading = false;
      state.getDashboardSuccess = true;
      state.getDashboardError = null;

      state.dashboardType = action.payload.dashboardType;
      state.dashboard = action.payload.data;
    },

    getDashboardFailure: (state, action) => {
      state.getDashboardLoading = false;
      state.getDashboardSuccess = false;
      state.getDashboardError = action.payload;

      state.dashboard = null;
      state.dashboardType = null;
    },

    // ================= CLEAR =================

    clearDashboardState: (state) => {
      state.dashboard = null;
      state.dashboardType = null;

      state.getDashboardLoading = false;
      state.getDashboardSuccess = false;
      state.getDashboardError = null;
    },
  },
});

export const {
  getDashboardRequest,
  getDashboardSuccess,
  getDashboardFailure,
  clearDashboardState,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;