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

}