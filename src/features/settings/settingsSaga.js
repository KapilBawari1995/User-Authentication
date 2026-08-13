import {
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";

import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import {
  getSettingsRequest,
  getSettingsSuccess,
  getSettingsFailure,

  updateSettingsRequest,
  updateSettingsSuccess,
  updateSettingsFailure,
} from "./settingsSlice";

// =====================================================
// GET SETTINGS
// =====================================================

function* getSettingsSaga() {
  try {
    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.SETTINGS
    );

    console.log(
      "GET SETTINGS RESPONSE:",
      response.data
    );

    yield put(
      getSettingsSuccess(
        response.data?.settings
      )
    );
  } catch (error) {
    console.error(
      "GET SETTINGS ERROR:",
      error
    );

    yield put(
      getSettingsFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to get settings."
      )
    );
  }
}

// =====================================================
// UPDATE SETTINGS
// =====================================================

function* updateSettingsSaga(action) {
  try {
    console.log(
      "UPDATE SETTINGS PAYLOAD:",
      action.payload
    );

    const response = yield call(
      axiosInstance.put,
      API_ENDPOINTS.SETTINGS,
      action.payload
    );

    console.log(
      "UPDATE SETTINGS RESPONSE:",
      response.data
    );

    yield put(
      updateSettingsSuccess(
        response.data?.settings
      )
    );
  } catch (error) {
    console.error(
      "UPDATE SETTINGS ERROR:",
      error
    );

    yield put(
      updateSettingsFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to update settings."
      )
    );
  }
}

// =====================================================
// WATCHER SAGA
// =====================================================

function* settingsSaga() {
  yield takeLatest(
    getSettingsRequest.type,
    getSettingsSaga
  );

  yield takeLatest(
    updateSettingsRequest.type,
    updateSettingsSaga
  );
}

export default settingsSaga;