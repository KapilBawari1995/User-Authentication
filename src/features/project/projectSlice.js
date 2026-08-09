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

    addTeamMembersLoading: false,
    addTeamMembersSuccess: false,
    addTeamMembersError: null,

getProjectTeamMembersLoading: false,
getProjectTeamMembersSuccess: false,
getProjectTeamMembersError: null,
teamMembers: [],

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

  addTeamMembersRequest: (state) => {
      state.addTeamMembersLoading = true;
      state.addTeamMembersSuccess = false;
      state.addTeamMembersError = null;
    },

    addTeamMembersSuccess: (state, action) => {
      state.addTeamMembersLoading = false;
      state.addTeamMembersSuccess = true;
      state.addTeamMembersError = null;

      // API updated project return kar rahi hai
      state.project = action.payload;
    },

    addTeamMembersFailure: (state, action) => {
      state.addTeamMembersLoading = false;
      state.addTeamMembersSuccess = false;
      state.addTeamMembersError = action.payload;
    },

    // ================= GET PROJECT TEAM MEMBERS =================

getProjectTeamMembersRequest: (state) => {
  state.getProjectTeamMembersLoading = true;
  state.getProjectTeamMembersSuccess = false;
  state.getProjectTeamMembersError = null;
},

getProjectTeamMembersSuccess: (state, action) => {
  state.getProjectTeamMembersLoading = false;
  state.getProjectTeamMembersSuccess = true;
  state.getProjectTeamMembersError = null;
  state.teamMembers = action.payload;
},

getProjectTeamMembersFailure: (state, action) => {
  state.getProjectTeamMembersLoading = false;
  state.getProjectTeamMembersSuccess = false;
  state.getProjectTeamMembersError = action.payload;
},


    // clearDeleteProjectState: (state) => {
    //   state.deleteProjectLoading = false;
    //   state.deleteProjectSuccess = false;
    //   state.deleteProjectError = null;
    //      state.addTeamMembersLoading = false;
    //   state.addTeamMembersSuccess = false;
    //   state.addTeamMembersError = null;
    // },
  },
});

export const {

  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  

  getProjectsRequest,
  getProjectsSuccess,
  getProjectsFailure,

  getProjectByIdRequest,
  getProjectByIdSuccess,
  getProjectByIdFailure,

  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,


  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,



  addTeamMembersRequest,
  addTeamMembersSuccess,
  addTeamMembersFailure,

getProjectTeamMembersRequest,
getProjectTeamMembersSuccess,
getProjectTeamMembersFailure,

  

} = projectSlice.actions;

export default projectSlice.reducer;