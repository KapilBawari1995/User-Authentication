import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import { successToast, errorToast } from "../../utils/toast";

import {
  // ================= CREATE =================
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,

  // ================= GET =================
  getProjectsRequest,
  getProjectsSuccess,
  getProjectsFailure,

  // ================= GET BY ID =================
  getProjectByIdRequest,
  getProjectByIdSuccess,
  getProjectByIdFailure,

  // ================= UPDATE =================
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,

  // ================= DELETE =================
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,

  // ================= TEAM MEMBERS =================
  addTeamMembersRequest,
  addTeamMembersSuccess,
  addTeamMembersFailure,

  getProjectTeamMembersRequest,
  getProjectTeamMembersSuccess,
  getProjectTeamMembersFailure,
} from "./projectSlice";


// =====================================================
// CREATE PROJECT
// =====================================================

function* handleCreateProject(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.CREATE_PROJECT,
      action.payload
    );

    console.log("CREATE PROJECT RESPONSE:", response.data);

    yield put(
      createProjectSuccess(
        response.data.data
      )
    );

    successToast(response.data.message);


  } catch (error) {
    console.error(
      "CREATE PROJECT ERROR:",
      error
    );

    const message =
      error.response?.data?.message

    yield put(
      createProjectFailure(message)
    );

    errorToast(message);
  }
}


// =====================================================
// GET PROJECTS
// =====================================================

function* handleGetProjects(action) {
  try {
    const {
      page,
      pageSize,
      search,
    } = action.payload || {};

    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_PROJECTS,
      {
        params: {
          page: page || 1,
          pageSize: pageSize || 10,
          search: search || "",
        },
      }
    );

    console.log(
      "GET PROJECTS RESPONSE:",
      response.data
    );

    yield put(
      getProjectsSuccess({
        projects: response.data.data || [],
        totalCount: response.data.totalCount || 0,
      })
    );

  } catch (error) {
    console.error(
      "GET PROJECTS ERROR:",
      error
    );

    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch projects";

    yield put(
      getProjectsFailure(message)
    );

    errorToast(message);
  }
}


// =====================================================
// GET PROJECT BY ID
// =====================================================

function* handleGetProjectById(action) {
  try {
    const projectId = action.payload;

    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_PROJECT_BY_ID}/${projectId}`
    );

    console.log(
      "GET PROJECT BY ID RESPONSE:",
      response.data
    );

    yield put(
      getProjectByIdSuccess(
        response.data.data
      )
    );

  } catch (error) {
    console.error(
      "GET PROJECT BY ID ERROR:",
      error
    );

    const message =
      error.response?.data?.message

    yield put(
      getProjectByIdFailure(message)
    );

    errorToast(message);
  }
}


// =====================================================
// UPDATE PROJECT
// =====================================================

function* handleUpdateProject(action) {
  try {
    const {
      id,
      data,
    } = action.payload;

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.UPDATE_PROJECT}/${id}`,
      data
    );


    yield put(
      updateProjectSuccess(
        response.data.data
      )
    );

    successToast(response.data.message);


  } catch (error) {


    const message =
      error.response?.data?.message

    yield put(
      updateProjectFailure(message)
    );

    errorToast(message);
  }
}



function* handleDeleteProject(action) {
  try {
    const projectId = action.payload;

    const response = yield call(
      axiosInstance.delete,
      `${API_ENDPOINTS.DELETE_PROJECT}/${projectId}`
    );

    console.log(
      "DELETE PROJECT RESPONSE:",
      response.data
    );

    yield put(
      deleteProjectSuccess(projectId)
    );

    successToast(response.data.message);


  } catch (error) {
    console.error(
      "DELETE PROJECT ERROR:",
      error
    );

    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete project";

    yield put(
      deleteProjectFailure(message)
    );

    errorToast(message);
  }
}


// =====================================================
// ADD TEAM MEMBERS
// =====================================================

function* handleAddTeamMember(action) {
  try {
    const {
      projectId,
      teamMembers,
    } = action.payload;

    console.log(
      "PROJECT ID:",
      projectId
    );

    console.log(
      "TEAM MEMBERS:",
      teamMembers
    );

    if (!projectId) {
      throw new Error(
        "Project ID is missing"
      );
    }

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.ADD_TEAM_MEMBER}/${projectId}/team-members`,
      {
        teamMembers,
      }
    );

    console.log(
      "ADD TEAM MEMBERS RESPONSE:",
      response.data
    );

    yield put(
      addTeamMembersSuccess(
        response.data.data
      )
    );

    successToast(
      response.data.message ||
      "Team members added successfully"
    );

  } catch (error) {
    console.error(
      "ADD TEAM MEMBERS ERROR:",
      error
    );

    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to add team members";

    yield put(
      addTeamMembersFailure(message)
    );

    errorToast(message);
  }
}


// =====================================================
// GET PROJECT TEAM MEMBERS
// =====================================================

function* handleGetProjectTeamMembers(action) {
  try {
    const projectId = action.payload;

    console.log(
      "GET PROJECT TEAM MEMBERS:",
      projectId
    );

    if (!projectId) {
      throw new Error(
        "Project ID is missing"
      );
    }

    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_PROJECT_TEAM_MEMBERS}/${projectId}/team-members`
    );

    console.log(
      "TEAM MEMBERS RESPONSE:",
      response.data
    );

    yield put(
      getProjectTeamMembersSuccess(
        response.data.data || []
      )
    );

  } catch (error) {
    console.error(
      "GET PROJECT TEAM MEMBERS ERROR:",
      error
    );

    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch project team members";

    yield put(
      getProjectTeamMembersFailure(message)
    );

    errorToast(message);
  }
}


// =====================================================
// WATCHER SAGA
// =====================================================

export default function* projectSaga() {

  // CREATE
  yield takeLatest(
    createProjectRequest.type,
    handleCreateProject
  );

  // GET LIST
  yield takeLatest(
    getProjectsRequest.type,
    handleGetProjects
  );

  // GET BY ID
  yield takeLatest(
    getProjectByIdRequest.type,
    handleGetProjectById
  );

  // UPDATE
  yield takeLatest(
    updateProjectRequest.type,
    handleUpdateProject
  );

  // DELETE
  yield takeLatest(
    
    deleteProjectRequest.type,
    handleDeleteProject
  );

  // ADD TEAM MEMBERS
  yield takeLatest(
    addTeamMembersRequest.type,
    handleAddTeamMember
  );

  // GET TEAM MEMBERS
  yield takeLatest(
    getProjectTeamMembersRequest.type,
    handleGetProjectTeamMembers
  );
}