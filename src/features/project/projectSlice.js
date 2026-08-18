import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",

  initialState: {

    // =====================================================
    // CREATE PROJECT
    // =====================================================

    createProjectLoading: false,
    createProjectSuccess: false,
    createProjectError: null,

    // =====================================================
    // GET PROJECTS
    // =====================================================

    projects: [],
    totalCount: 0,

    getProjectsLoading: false,
    getProjectsError: null,

    // =====================================================
    // GET PROJECT BY ID
    // =====================================================

    project: null,

    getProjectLoading: false,
    getProjectError: null,

    // =====================================================
    // UPDATE PROJECT
    // =====================================================

    updateProjectLoading: false,
    updateProjectSuccess: false,
    updateProjectError: null,

    // =====================================================
    // DELETE PROJECT
    // =====================================================

    deleteProjectLoading: false,
    deleteProjectSuccess: false,
    deleteProjectError: null,

    // =====================================================
    // ADD TEAM MEMBERS
    // =====================================================

    addTeamMembersLoading: false,
    addTeamMembersSuccess: false,
    addTeamMembersError: null,

    // =====================================================
    // GET PROJECT TEAM MEMBERS
    // =====================================================

    getProjectTeamMembersLoading: false,
    getProjectTeamMembersSuccess: false,
    getProjectTeamMembersError: null,

    teamMembers: [],
  },

  reducers: {

    // =====================================================
    // CREATE PROJECT
    // =====================================================

    createProjectRequest: (state) => {
      state.createProjectLoading = true;
      state.createProjectSuccess = false;
      state.createProjectError = null;
    },

    createProjectSuccess: (state, action) => {
      state.createProjectLoading = false;
      state.createProjectSuccess = true;
      state.createProjectError = null;

      // API se created project mila ho to list ke top par add karo
      if (action.payload) {
        state.projects.unshift(action.payload);
        state.totalCount += 1;
      }
    },

    createProjectFailure: (state, action) => {
      state.createProjectLoading = false;
      state.createProjectSuccess = false;
      state.createProjectError = action.payload;
    },


    // =====================================================
    // GET PROJECTS
    // =====================================================

    getProjectsRequest: (state) => {
      state.getProjectsLoading = true;
      state.getProjectsError = null;
    },

    getProjectsSuccess: (state, action) => {
      state.getProjectsLoading = false;
      state.getProjectsError = null;

      state.projects = action.payload.projects || [];
      state.totalCount = action.payload.totalCount || 0;
    },

    getProjectsFailure: (state, action) => {
      state.getProjectsLoading = false;
      state.getProjectsError = action.payload;
    },


    // =====================================================
    // GET PROJECT BY ID
    // =====================================================

    getProjectByIdRequest: (state) => {
      state.getProjectLoading = true;
      state.getProjectError = null;
      state.project = null;
    },

    getProjectByIdSuccess: (state, action) => {
      state.getProjectLoading = false;
      state.getProjectError = null;

      state.project = action.payload;
    },

    getProjectByIdFailure: (state, action) => {
      state.getProjectLoading = false;
      state.getProjectError = action.payload;
    },


    // =====================================================
    // UPDATE PROJECT
    // =====================================================

    updateProjectRequest: (state) => {
      state.updateProjectLoading = true;
      state.updateProjectSuccess = false;
      state.updateProjectError = null;
    },

    updateProjectSuccess: (state, action) => {
      state.updateProjectLoading = false;
      state.updateProjectSuccess = true;
      state.updateProjectError = null;

      const updatedProject = action.payload;

      if (!updatedProject?._id) {
        return;
      }

      // Update project details page
      state.project = updatedProject;

      // Update project inside list
      const index = state.projects.findIndex(
        (item) => item._id === updatedProject._id
      );

      if (index !== -1) {
        state.projects[index] = updatedProject;
      }
    },

    updateProjectFailure: (state, action) => {
      state.updateProjectLoading = false;
      state.updateProjectSuccess = false;
      state.updateProjectError = action.payload;
    },


    // =====================================================
    // DELETE PROJECT
    // =====================================================

    deleteProjectRequest: (state) => {
      state.deleteProjectLoading = true;
      state.deleteProjectSuccess = false;
      state.deleteProjectError = null;
    },

    deleteProjectSuccess: (state, action) => {
      state.deleteProjectLoading = false;
      state.deleteProjectSuccess = true;
      state.deleteProjectError = null;

      const projectId = action.payload;

      state.projects = state.projects.filter(
        (item) => item._id !== projectId
      );

      if (state.totalCount > 0) {
        state.totalCount -= 1;
      }

      // Agar deleted project currently open tha
      if (state.project?._id === projectId) {
        state.project = null;
      }
    },

    deleteProjectFailure: (state, action) => {
      state.deleteProjectLoading = false;
      state.deleteProjectSuccess = false;
      state.deleteProjectError = action.payload;
    },


    // =====================================================
    // ADD TEAM MEMBERS
    // =====================================================

    addTeamMembersRequest: (state) => {
      state.addTeamMembersLoading = true;
      state.addTeamMembersSuccess = false;
      state.addTeamMembersError = null;
    },

    addTeamMembersSuccess: (state, action) => {
      state.addTeamMembersLoading = false;
      state.addTeamMembersSuccess = true;
      state.addTeamMembersError = null;

      if (action.payload) {
        state.project = action.payload;

        // Project list mein bhi update karo
        const index = state.projects.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      }
    },

    addTeamMembersFailure: (state, action) => {
      state.addTeamMembersLoading = false;
      state.addTeamMembersSuccess = false;
      state.addTeamMembersError = action.payload;
    },


    // =====================================================
    // GET PROJECT TEAM MEMBERS
    // =====================================================

    getProjectTeamMembersRequest: (state) => {
      state.getProjectTeamMembersLoading = true;
      state.getProjectTeamMembersSuccess = false;
      state.getProjectTeamMembersError = null;
    },

    getProjectTeamMembersSuccess: (state, action) => {
      state.getProjectTeamMembersLoading = false;
      state.getProjectTeamMembersSuccess = true;
      state.getProjectTeamMembersError = null;

      state.teamMembers = action.payload || [];
    },

    getProjectTeamMembersFailure: (state, action) => {
      state.getProjectTeamMembersLoading = false;
      state.getProjectTeamMembersSuccess = false;
      state.getProjectTeamMembersError = action.payload;
    },


    // =====================================================
    // CLEAR PROJECT STATE
    // =====================================================

    clearProjectState: (state) => {

      // CREATE
      state.createProjectLoading = false;
      state.createProjectSuccess = false;
      state.createProjectError = null;

      // GET BY ID
      state.getProjectLoading = false;
      state.getProjectError = null;

      // Current project
      state.project = null;

      // UPDATE
      state.updateProjectLoading = false;
      state.updateProjectSuccess = false;
      state.updateProjectError = null;

      // DELETE
      state.deleteProjectLoading = false;
      state.deleteProjectSuccess = false;
      state.deleteProjectError = null;

      // ADD TEAM
      state.addTeamMembersLoading = false;
      state.addTeamMembersSuccess = false;
      state.addTeamMembersError = null;

      // GET TEAM
      state.getProjectTeamMembersLoading = false;
      state.getProjectTeamMembersSuccess = false;
      state.getProjectTeamMembersError = null;

      state.teamMembers = [];
    },
  },
});


// =====================================================
// ACTIONS
// =====================================================

export const {

  // CREATE
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,

  // GET
  getProjectsRequest,
  getProjectsSuccess,
  getProjectsFailure,

  // GET BY ID
  getProjectByIdRequest,
  getProjectByIdSuccess,
  getProjectByIdFailure,

  // UPDATE
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,

  // DELETE
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,

  // TEAM MEMBERS
  addTeamMembersRequest,
  addTeamMembersSuccess,
  addTeamMembersFailure,

  getProjectTeamMembersRequest,
  getProjectTeamMembersSuccess,
  getProjectTeamMembersFailure,

  // CLEAR
  clearProjectState,

} = projectSlice.actions;


export default projectSlice.reducer;