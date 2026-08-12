import {
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";

import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import {
  getDashboardRequest,
  getDashboardSuccess,
  getDashboardFailure,
} from "./dashboardSlice";

// =====================================================
// GET DASHBOARD
// =====================================================

function* handleGetDashboard() {
  try {
    console.log("DASHBOARD SAGA HIT");

    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_DASHBOARD
    );

    console.log(
      "DASHBOARD RESPONSE:",
      response.data
    );

    yield put(
      getDashboardSuccess({
        dashboardType:
          response.data.dashboardType,

        data:
          response.data.data,
      })
    );

  } catch (error) {
    console.error(
      "DASHBOARD ERROR:",
      error
    );

    yield put(
      getDashboardFailure(
        error?.response?.data?.message ||
          "Failed to load dashboard"
      )
    );
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* dashboardSaga() {
  yield takeLatest(
    getDashboardRequest.type,
    handleGetDashboard
  );
}