import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import {
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


} from "./projectSlice";



// ================= CREATE PROJECT =================

function* handleCreateProject(action) {
  try {
    console.log("PROJECT SAGA HIT", action.payload);

    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.CREATE_PROJECT,
      action.payload
    );
    console.log(response.data);


    yield put(createProjectSuccess());

  } catch (error) {
    console.log(error);

    yield put(
      createProjectFailure(
        error.response?.data?.message || error.message
      )
    );

  }
}



// ================= GET PROJECTS =================

function* handleGetProjects(action) {
  try {

    const { page, pageSize, search } =
      action.payload || {};

    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_PROJECTS}?page=${page || 1}&pageSize=${pageSize || 10}&search=${search || ""}`
    );

    yield put(
      getProjectsSuccess({
        projects: response.data.data,
        totalCount: response.data.totalCount,
      })
    );

  } catch (error) {

    yield put(
      getProjectsFailure(
        error.response?.data?.message || error.message
      )
    );

  }
}



// ================= GET PROJECT BY ID =================

function* handleGetProjectById(action) {
  try {

    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_PROJECT_BY_ID}/${action.payload}`
    );

    yield put(
      getProjectByIdSuccess(response.data.data)
    );

  } catch (error) {

    yield put(
      getProjectByIdFailure(
        error.response?.data?.message || error.message
      )
    );

  }
}



// ================= UPDATE PROJECT =================

function* handleUpdateProject(action) {
  try {

    const { id, data } = action.payload;

    yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.UPDATE_PROJECT}/${id}`,
      data
    );

    yield put(updateProjectSuccess());

  } catch (error) {

    yield put(
      updateProjectFailure(
        error.response?.data?.message || error.message
      )
    );

  }
}



// ================= DELETE PROJECT =================

function* handleDeleteProject(action) {
  try {

    yield call(
      axiosInstance.delete,
      `${API_ENDPOINTS.DELETE_PROJECT}/${action.payload}`
    );

    yield put(deleteProjectSuccess());

  } catch (error) {

    yield put(
      deleteProjectFailure(
        error.response?.data?.message || error.message
      )
    );

  }
}

function* handleAddTeamMember(action) {
  try {
    const { projectId, teamMembers } = action.payload;

    console.log("PROJECT ID:", projectId);
    console.log("TEAM MEMBERS:", teamMembers);

    if (!projectId) {
      throw new Error("Project ID is missing");
    }

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.ADD_TEAM_MEMBER}/${projectId}/team-members`,
      {
        teamMembers,
      }
    );

    console.log("ADD TEAM RESPONSE:", response.data);

    yield put(
      addTeamMembersSuccess(response.data.data)
    );

  } catch (error) {
    console.log("ADD TEAM ERROR:", error);

    yield put(
      addTeamMembersFailure(
        error?.response?.data?.message ||
        error.message ||
        "Failed to add team member"
      )
    );
  }
}

// ================= GET PROJECT TEAM MEMBERS =================

function* handleGetProjectTeamMembers(action) {
  try {
    const projectId = action.payload;

    console.log(
      "GET PROJECT TEAM MEMBERS:",
      projectId
    );

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

    yield put(
      getProjectTeamMembersFailure(
        error?.response?.data?.message ||
        "Failed to fetch project team members"
      )
    );
  }
}

// ================= WATCHER =================

export default function* projectSaga() {

  yield takeLatest(
    createProjectRequest.type,
    handleCreateProject
  );

  yield takeLatest(
    getProjectsRequest.type,
    handleGetProjects
  );

  yield takeLatest(
    getProjectByIdRequest.type,
    handleGetProjectById
  );

  yield takeLatest(
    updateProjectRequest.type,
    handleUpdateProject
  );

  yield takeLatest(
    deleteProjectRequest.type,
    handleDeleteProject
  );

   yield takeLatest(
    addTeamMembersRequest.type,
    handleAddTeamMember
  );

  yield takeLatest(
  getProjectTeamMembersRequest.type,
  handleGetProjectTeamMembers
);

}