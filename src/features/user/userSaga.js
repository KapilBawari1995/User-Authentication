// src/features/user/userSaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";
import { successToast, errorToast } from "../../utils/toast";

import {
  createUserRequest,
  createUserSuccess,
  createUserFailure,


   getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
} from "./userSlice";

const onSuccess = (message, navigate, path) => {
  successToast(message);

  if (navigate && path) {
    navigate(path);
  }
};

// ================= CREATE USER =================

function* handleCreateUser(action) {
  try {
    const { data, navigate, onSuccessCallback } = action.payload;

    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.CREATE_USER,
      data
    );

    yield put(createUserSuccess());

    if (onSuccessCallback) {
      onSuccessCallback();
    }

    onSuccess(
      response.data.message,
      navigate,
      "/admin/users"
    );

  } catch (error) {
    const message =
      error.response?.data?.message || error.message;

    yield put(createUserFailure(message));

    errorToast(message);
  }
}



// ================= GET USERS =================

function* handleGetUsers() {

    try {

        const response = yield call(
            axiosInstance.get,
            API_ENDPOINTS.GET_USERS
        );

        yield put(
            getUsersSuccess(response.data.data)
        );

    } catch (error) {

        const message =
            error.response?.data?.message || error.message;

        yield put(
            getUsersFailure(message)
        );

        errorToast(message);

    }

}

// ================= WATCHER =================

export default function* userSaga() {
  yield takeLatest(
    createUserRequest.type,
    handleCreateUser
  );
  yield takeLatest(
    getUsersRequest.type,
    handleGetUsers
);
}