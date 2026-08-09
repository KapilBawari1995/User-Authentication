import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import {
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
} from "./departmentSlice";

import {
  successToast,
  errorToast,
} from "../../utils/toast";

// =================================================
// GET DEPARTMENTS
// =================================================

function* handleGetDepartments() {
  try {
    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_DEPARTMENTS
    );

    yield put(
      getDepartmentsSuccess(
        response.data.data
      )
    );
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message;

    yield put(
      getDepartmentsFailure(message)
    );

    errorToast(message);
  }
}

// =================================================
// CREATE DEPARTMENT
// =================================================

function* handleCreateDepartment(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.CREATE_DEPARTMENT,
      action.payload
    );

    yield put(
      createDepartmentSuccess(
        response.data.data
      )
    );

    successToast(response.data.message);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message;

    yield put(
      createDepartmentFailure(message)
    );

    errorToast(message);
  }
}

// =================================================
// GET DEPARTMENT MANAGERS
// =================================================

function* handleGetDepartmentManagers(action) {
  try {
    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_DEPARTMENT_MANAGERS}/${action.payload}/managers`
    );

    yield put(
      getDepartmentManagersSuccess(
        response.data.data
      )
    );
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message;

    yield put(
      getDepartmentManagersFailure(message)
    );

    errorToast(message);
  }
}

// =================================================
// ASSIGN DEPARTMENT MANAGER
// =================================================

function* handleAssignDepartmentManager(action) {
  try {
    const {
      departmentId,
      managerId,
    } = action.payload;

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.ASSIGN_DEPARTMENT_MANAGER}/${departmentId}/assign-manager`,
      {
        managerId,
      }
    );

    yield put(
      assignDepartmentManagerSuccess(
        response.data.data
      )
    );

    successToast(response.data.message);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message;

    yield put(
      assignDepartmentManagerFailure(message)
    );

    errorToast(message);
  }
}

// =================================================
// WATCHER
// =================================================

export default function* departmentSaga() {
  yield takeLatest(
    getDepartmentsRequest.type,
    handleGetDepartments
  );

  yield takeLatest(
    createDepartmentRequest.type,
    handleCreateDepartment
  );

  yield takeLatest(
    getDepartmentManagersRequest.type,
    handleGetDepartmentManagers
  );

  yield takeLatest(
    assignDepartmentManagerRequest.type,
    handleAssignDepartmentManager
  );
}