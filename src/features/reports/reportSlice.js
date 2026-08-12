import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const reportSlice = createSlice({
  name: "reports",

  initialState,

  reducers: {
    // =====================================================
    // GET REPORT
    // =====================================================

    getReportRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getReportSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },

    getReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =====================================================
    // CLEAR REPORT
    // =====================================================

    clearReport: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  getReportRequest,
  getReportSuccess,
  getReportFailure,
  clearReport,
} = reportSlice.actions;

export default reportSlice.reducer;