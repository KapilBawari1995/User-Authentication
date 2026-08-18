import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import { successToast, errorToast } from "../../utils/toast";

import {
  getRolesRequest,
  getRolesSuccess,
  getRolesFailure,

  getRoleByIdRequest,
  getRoleByIdSuccess,
  getRoleByIdFailure,

  createRoleRequest,
  createRoleSuccess,
  createRoleFailure,

  updateRoleRequest,
  updateRoleSuccess,
  updateRoleFailure,

  deleteRoleRequest,
  deleteRoleSuccess,
  deleteRoleFailure,
} from "./roleSlice";

// ================= GET ROLES =================

function* handleGetRoles(action) {
  try {
    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_ROLES,
      {
        params: action.payload,
      }
    );

    const roles = response.data?.data || [];
      response.data?.count ?? roles.length;
  

    yield put(
      getRolesSuccess({
        data: roles,
      })
    );
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch roles.";

    yield put(
      getRolesFailure(message)
    );

    errorToast(message);
  }
}

// ================= GET ROLE BY ID =================

function* handleGetRoleById(action) {
  try {
    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_ROLE_BY_ID}/${action.payload}`
    );

    yield put(
      getRoleByIdSuccess(response.data.data)
    );
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch role.";

    yield put(
      getRoleByIdFailure(message)
    );

    errorToast(message);
  }
}

// ================= CREATE ROLE =================

function* handleCreateRole(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.CREATE_ROLE,
      action.payload
    );

    yield put(
      createRoleSuccess(response.data.data)
    );

    successToast(
      response.data.message ||
        "Role created successfully."
    );

    // Refresh roles
    yield put(getRolesRequest());
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to create role.";

    yield put(
      createRoleFailure(message)
    );

    errorToast(message);
  }
}

// ================= UPDATE ROLE =================

function* handleUpdateRole(action) {
  try {
    const { id, data } = action.payload;

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.UPDATE_ROLE}/${id}`,
      data
    );

    yield put(
      updateRoleSuccess(response.data.data)
    );

    successToast(
      response.data.message ||
        "Role updated successfully."
    );

    // Refresh roles
    yield put(getRolesRequest());
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to update role.";

    yield put(
      updateRoleFailure(message)
    );

    errorToast(message);
  }
}

// ================= DELETE ROLE =================

function* handleDeleteRole(action) {
  try {
    const response = yield call(
      axiosInstance.delete,
      `${API_ENDPOINTS.DELETE_ROLE}/${action.payload}`
    );

    yield put(
      deleteRoleSuccess(action.payload)
    );

    successToast(
      response.data.message ||
        "Role deleted successfully."
    );

    // Refresh roles
    yield put(getRolesRequest());
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete role.";

    yield put(
      deleteRoleFailure(message)
    );

    errorToast(message);
  }
}

// ================= WATCHER =================

export default function* roleSaga() {
  yield takeLatest(
    getRolesRequest.type,
    handleGetRoles
  );
  console.log("get roel res wather fun  ")

  yield takeLatest(
    getRoleByIdRequest.type,
    handleGetRoleById
  );

  yield takeLatest(
    createRoleRequest.type,
    handleCreateRole
  );

  yield takeLatest(
    updateRoleRequest.type,
    handleUpdateRole
  );

  yield takeLatest(
    deleteRoleRequest.type,
    handleDeleteRole
  );
}