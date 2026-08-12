import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../app/api/axiosInstance";

import {
  getCalendarRequest,
  getCalendarSuccess,
  getCalendarFailure,

  getCalendarTodayRequest,
  getCalendarTodaySuccess,
  getCalendarTodayFailure,

  getCalendarByIdRequest,
  getCalendarByIdSuccess,
  getCalendarByIdFailure,
} from "./calendarSlice";

import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

// =====================================================
// GET CALENDAR
// =====================================================

function* handleGetCalendar(action) {
  try {
    console.log("🔥 CALENDAR API CALL STARTED");
    console.log("Payload:", action.payload);

    const params = action.payload || {};

    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_CALENDAR,
      {
        params,
      }
    );

    console.log("✅ CALENDAR API RESPONSE:", response.data);

    yield put(getCalendarSuccess(response.data));
  } catch (error) {
    console.log(
      "❌ CALENDAR API ERROR:",
      error.response?.data || error.message
    );

    yield put(
      getCalendarFailure(
        error.response?.data?.message ||
          "Failed to fetch calendar"
      )
    );
  }
}

// =====================================================
// GET TODAY
// =====================================================

function* handleGetCalendarToday() {
  try {
    console.log("🔥 TODAY CALENDAR API CALL STARTED");

    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_CALENDAR_TODAY
    );

    console.log(
      "✅ TODAY CALENDAR RESPONSE:",
      response.data
    );

    yield put(
      getCalendarTodaySuccess(response.data)
    );
  } catch (error) {
    console.log(
      "❌ TODAY CALENDAR ERROR:",
      error.response?.data || error.message
    );

    yield put(
      getCalendarTodayFailure(
        error.response?.data?.message ||
          "Failed to fetch today's schedule"
      )
    );
  }
}

// =====================================================
// GET BY ID
// =====================================================

function* handleGetCalendarById(action) {
  try {
    const id = action.payload;

    console.log("🔥 CALENDAR DETAIL ID:", id);

    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_CALENDAR_BY_ID}/${id}`
    );

    console.log(
      "✅ CALENDAR DETAIL RESPONSE:",
      response.data
    );

    yield put(
      getCalendarByIdSuccess(response.data)
    );
  } catch (error) {
    console.log(
      "❌ CALENDAR DETAIL ERROR:",
      error.response?.data || error.message
    );

    yield put(
      getCalendarByIdFailure(
        error.response?.data?.message ||
          "Failed to fetch calendar event"
      )
    );
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* calendarSaga() {
  yield takeLatest(
    getCalendarRequest.type,
    handleGetCalendar
  );

  yield takeLatest(
    getCalendarTodayRequest.type,
    handleGetCalendarToday
  );

  yield takeLatest(
    getCalendarByIdRequest.type,
    handleGetCalendarById
  );
}