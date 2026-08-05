import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import {
  getPermissionsRequest,
  getPermissionsSuccess,
  getPermissionsFailure,
  assignPermissionRequest,
  assignPermissionSuccess,
  assignPermissionFailure,
} from "./permissionSlice";

// ================= GET ROLE PERMISSIONS =================

function* handleGetPermissions(action) {
  try {
    const roleId = action.payload;

    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_ROLE_PERMISSIONS}/${roleId}`
    );

    yield put(getPermissionsSuccess(response.data.data));
  } catch (error) {
    yield put(
      getPermissionsFailure(
        error.response?.data?.message || "Failed to fetch permissions."
      )
    );
  }
}

// ================= ASSIGN ROLE PERMISSIONS =================

function* handleAssignPermission(action) {
  try {
    const { roleId, permissions } = action.payload;

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.ASSIGN_ROLE_PERMISSIONS}/${roleId}`,
      {
        permissions,
      }
    );

    yield put(assignPermissionSuccess(response.data.data.permissions));
  } catch (error) {
    yield put(
      assignPermissionFailure(
        error.response?.data?.message || "Failed to assign permissions."
      )
    );
  }
}

// ================= WATCHERS =================

export default function* permissionSaga() {
  yield takeLatest(
    getPermissionsRequest.type,
    handleGetPermissions
  );

  yield takeLatest(
    assignPermissionRequest.type,
    handleAssignPermission
  );
}