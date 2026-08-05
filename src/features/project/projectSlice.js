import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",

  initialState: {

    // ================= CREATE PROJECT =================

    createProjectLoading: false,
    createProjectSuccess: false,
    createProjectError: null,

    // ================= GET PROJECTS =================

    projects: [],
    totalCount: 0,
    getProjectsLoading: false,
    getProjectsError: null,

    // ================= GET PROJECT BY ID =================

    project: null,
    getProjectLoading: false,
    getProjectError: null,

    // ================= UPDATE PROJECT =================

    updateProjectLoading: false,
    updateProjectSuccess: false,
    updateProjectError: null,

    // ================= DELETE PROJECT =================

    deleteProjectLoading: false,
    deleteProjectSuccess: false,
    deleteProjectError: null,
  },

  reducers: {

    // ================= CREATE PROJECT =================

    createProjectRequest: (state) => {
      state.createProjectLoading = true;
      state.createProjectSuccess = false;
      state.createProjectError = null;
    },

    createProjectSuccess: (state) => {
      state.createProjectLoading = false;
      state.createProjectSuccess = true;
    },

    createProjectFailure: (state, action) => {
      state.createProjectLoading = false;
      state.createProjectError = action.payload;
    },

    clearCreateProjectState: (state) => {
      state.createProjectLoading = false;
      state.createProjectSuccess = false;
      state.createProjectError = null;
    },

    // ================= GET PROJECTS =================

    getProjectsRequest: (state) => {
      state.getProjectsLoading = true;
      state.getProjectsError = null;
    },

    getProjectsSuccess: (state, action) => {
      state.getProjectsLoading = false;
      state.projects = action.payload.projects;
      state.totalCount = action.payload.totalCount;
    },

    getProjectsFailure: (state, action) => {
      state.getProjectsLoading = false;
      state.getProjectsError = action.payload;
    },

    // ================= GET PROJECT BY ID =================

    getProjectByIdRequest: (state) => {
      state.getProjectLoading = true;
      state.getProjectError = null;
    },

    getProjectByIdSuccess: (state, action) => {
      state.getProjectLoading = false;
      state.project = action.payload;
    },

    getProjectByIdFailure: (state, action) => {
      state.getProjectLoading = false;
      state.getProjectError = action.payload;
    },

    // ================= UPDATE PROJECT =================

    updateProjectRequest: (state) => {
      state.updateProjectLoading = true;
      state.updateProjectSuccess = false;
      state.updateProjectError = null;
    },

    updateProjectSuccess: (state) => {
      state.updateProjectLoading = false;
      state.updateProjectSuccess = true;
    },

    updateProjectFailure: (state, action) => {
      state.updateProjectLoading = false;
      state.updateProjectError = action.payload;
    },

    clearUpdateProjectState: (state) => {
      state.updateProjectLoading = false;
      state.updateProjectSuccess = false;
      state.updateProjectError = null;
    },

    // ================= DELETE PROJECT =================

    deleteProjectRequest: (state) => {
      state.deleteProjectLoading = true;
      state.deleteProjectSuccess = false;
      state.deleteProjectError = null;
    },

    deleteProjectSuccess: (state) => {
      state.deleteProjectLoading = false;
      state.deleteProjectSuccess = true;
    },

    deleteProjectFailure: (state, action) => {
      state.deleteProjectLoading = false;
      state.deleteProjectError = action.payload;
    },

    clearDeleteProjectState: (state) => {
      state.deleteProjectLoading = false;
      state.deleteProjectSuccess = false;
      state.deleteProjectError = null;
    },
  },
});

export const {

  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  clearCreateProjectState,

  getProjectsRequest,
  getProjectsSuccess,
  getProjectsFailure,

  getProjectByIdRequest,
  getProjectByIdSuccess,
  getProjectByIdFailure,

  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
  clearUpdateProjectState,

  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,
  clearDeleteProjectState,

} = projectSlice.actions;

export default projectSlice.reducer;