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
          page: page,
          pageSize: pageSize,
          search: search,
        },
      }
    );

  

    yield put(
      getProjectsSuccess({
        projects: response.data.data || [],
        totalCount: response.data.totalCount || 0,
      })
    );

  } catch (error) {
  

    const message =
      error.response?.data?.message
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


    yield put(
      getProjectByIdSuccess(
        response.data.data
      )
    );

  } catch (error) {
   

    const message =
      error.response?.data?.message

    yield put(
      getProjectByIdFailure(message)
    );

    errorToast(message);
  }
}


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


    yield put(
      deleteProjectSuccess(projectId)
    );

    successToast(response.data.message);


  } catch (error) {
   
    const message =
      error.response?.data?.message

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

 
    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.ADD_TEAM_MEMBER}/${projectId}/team-members`,
      {
        teamMembers,
      }
    );

  

    yield put(
      addTeamMembersSuccess(
        response.data.data
      )
    );

    successToast(
      response.data.message
    );

  } catch (error) {
   

    const message =
      error.response?.data?.message

    yield put(
      addTeamMembersFailure(message)
    );

    errorToast(message);
  }
}




function* handleGetProjectTeamMembers(action) {
  try {
    const projectId = action.payload;
    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_PROJECT_TEAM_MEMBERS}/${projectId}/team-members`
    );

   

    yield put(
      getProjectTeamMembersSuccess(
        response.data.data
      )
    );

  } catch (error) {
  

    const message =
      error.response?.data?.message

    yield put(
      getProjectTeamMembersFailure(message)
    );

    errorToast(message);
  }
}


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