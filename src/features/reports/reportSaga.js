import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";

import {
  getReportRequest,
  getReportSuccess,
  getReportFailure,
} from "./reportSlice";

import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

// =====================================================
// GET REPORT OVERVIEW
// GET /api/v1/reports
// =====================================================

function* handleGetReport() {
  try {
    console.log("🔥 REPORT API CALL STARTED");

    console.log(
      "📌 REPORT ENDPOINT:",
API_ENDPOINTS.GET_REPORT_OVERVIEW
    );

    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_REPORT_OVERVIEW
    );

    console.log(
      "✅ REPORT API RESPONSE:",
      response.data
    );

    yield put(
      getReportSuccess(response.data)
    );
  } catch (error) {
    console.error(
      "❌ REPORT API ERROR:",
      error.response?.data || error
    );

    yield put(
      getReportFailure(
        error.response?.data?.message ||
          "Failed to fetch reports"
      )
    );
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* reportSaga() {
  yield takeLatest(
    getReportRequest.type,
    handleGetReport
  );
}