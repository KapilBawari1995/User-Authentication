import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ================= DEPARTMENTS =================
  departments: [],
  department: null,

  getDepartmentsLoading: false,
  getDepartmentsError: null,

  // ================= CREATE DEPARTMENT =================
  createLoading: false,
  createSuccess: false,
  createError: null,

  // ================= GET MANAGERS =================
  managers: [],
  managersLoading: false,
  managersError: null,

  // ================= ASSIGN MANAGER =================
  assignLoading: false,
  assignSuccess: false,
  assignError: null,
};

const departmentSlice = createSlice({
  name: "department",

  initialState,

  reducers: {
    // =================================================
    // GET DEPARTMENTS
    // =================================================

    getDepartmentsRequest: (state) => {
      state.getDepartmentsLoading = true;
      state.getDepartmentsError = null;
    },

    getDepartmentsSuccess: (state, action) => {
      state.getDepartmentsLoading = false;
      state.departments = action.payload;
    },

    getDepartmentsFailure: (state, action) => {
      state.getDepartmentsLoading = false;
      state.getDepartmentsError = action.payload;
    },

    // =================================================
    // CREATE DEPARTMENT
    // =================================================

    createDepartmentRequest: (state) => {
      state.createLoading = true;
      state.createSuccess = false;
      state.createError = null;
    },

    createDepartmentSuccess: (state, action) => {
      state.createLoading = false;
      state.createSuccess = true;

      state.departments.unshift(action.payload);
    },

    createDepartmentFailure: (state, action) => {
      state.createLoading = false;
      state.createError = action.payload;
    },

    // =================================================
    // GET DEPARTMENT MANAGERS
    // =================================================

    getDepartmentManagersRequest: (state) => {
      state.managersLoading = true;
      state.managersError = null;
      state.managers = [];
    },

    getDepartmentManagersSuccess: (state, action) => {
      state.managersLoading = false;
      state.managers = action.payload;
    },

    getDepartmentManagersFailure: (state, action) => {
      state.managersLoading = false;
      state.managersError = action.payload;
    },

    // =================================================
    // ASSIGN MANAGER
    // =================================================

    assignDepartmentManagerRequest: (state) => {
      state.assignLoading = true;
      state.assignSuccess = false;
      state.assignError = null;
    },

    assignDepartmentManagerSuccess: (state, action) => {
      state.assignLoading = false;
      state.assignSuccess = true;

      // Optional:
      // Agar API updated department return karti hai
      // to yahan department update kar sakte ho.
      if (action.payload) {
        state.department = action.payload;
      }
    },

    assignDepartmentManagerFailure: (state, action) => {
      state.assignLoading = false;
      state.assignError = action.payload;
    },

    // =================================================
    // CLEAR
    // =================================================

    clearDepartmentState: (state) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = null;

      state.assignLoading = false;
      state.assignSuccess = false;
      state.assignError = null;

      state.managersLoading = false;
      state.managersError = null;
      state.managers = [];

      state.getDepartmentsError = null;
    },
  },
});

export const {
  // GET DEPARTMENTS
  getDepartmentsRequest,
  getDepartmentsSuccess,
  getDepartmentsFailure,

  // CREATE
  createDepartmentRequest,
  createDepartmentSuccess,
  createDepartmentFailure,

  // MANAGERS
  getDepartmentManagersRequest,
  getDepartmentManagersSuccess,
  getDepartmentManagersFailure,

  // ASSIGN
  assignDepartmentManagerRequest,
  assignDepartmentManagerSuccess,
  assignDepartmentManagerFailure,

  // CLEAR
  clearDepartmentState,
} = departmentSlice.actions;

export default departmentSlice.reducer;