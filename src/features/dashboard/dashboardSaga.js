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

    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_DASHBOARD
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
   
    yield put(
      getDashboardFailure(
        error?.response?.data?.message 
      )
    );
  }
}


export default function* dashboardSaga() {
  yield takeLatest(
    getDashboardRequest.type,
    handleGetDashboard
  );
}