import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import { successToast, errorToast } from "../../utils/toast";

import {
  getRolesRequest,
  getRolesSuccess,
  getRolesFailure,

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

const onSuccess = (message, navigate, path) => {
  successToast(message);

  if (navigate && path) {
    navigate(path);
  }
};

// ================= GET ROLES =================

function* handleGetRoles() {
  try {
    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_ROLES
    );

    yield put(
      getRolesSuccess(
        response.data.data
      )
    );

  } catch (error) {

    const message =
      error.response?.data?.message || error.message;

    yield put(
      getRolesFailure(message)
    );

    errorToast(message);
  }
}

// ================= CREATE ROLE =================

function* handleCreateRole(action) {
  try {
    const { data, navigate } = action.payload;

    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.CREATE_ROLE,
      data
    );

    yield put(
      createRoleSuccess()
    );

    successToast(response.data.message);

    yield put(
      getRolesRequest()
    );

    if (navigate) {
      navigate("/admin/roles/addrole");
    }


  } catch (error) {

    const message =
      error.response?.data?.message || error.message;

    yield put(
      createRoleFailure(message)
    );

    errorToast(message);
  }
}

// ================= UPDATE ROLE =================

function* handleUpdateRole(action) {
  try {
    const { id, data, navigate } = action.payload;

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.UPDATE_ROLE}/${id}`,
      data
    );

    yield put(
      updateRoleSuccess()
    );

    successToast(response.data.message);

    yield put(
      getRolesRequest()
    );

    if (navigate) {
      navigate("/admin/roles");
    }

  } catch (error) {

    const message =
      error.response?.data?.message || error.message;

    yield put(
      updateRoleFailure(message)
    );

    errorToast(message);
  }
}

// ================= DELETE ROLE =================

function* handleDeleteRole(action) {
  try {
    const { id } = action.payload;

    const response = yield call(
      axiosInstance.delete,
      `${API_ENDPOINTS.DELETE_ROLE}/${id}`
    );

    yield put(
      deleteRoleSuccess()
    );

    successToast(response.data.message);

    yield put(
      getRolesRequest()
    );

  } catch (error) {

    const message =
      error.response?.data?.message || error.message;

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