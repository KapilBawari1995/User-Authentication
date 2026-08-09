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


  getUserByIdRequest,
  getUserByIdSuccess,
  getUserByIdFailure,

 
 updateUserRequest,
  updateUserSuccess,
  updateUserFailure,

  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,

} from "./userSlice";



// ================= CREATE USER =================




// ================= GET USERS =================

function* handleGetUsers(action) {

  try {

    const response = yield call(
      axiosInstance.get,
      API_ENDPOINTS.GET_USERS,
       {
                params: action.payload
            }
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


function* handleGetUserById(action) {
  try {
    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_USER_BY_ID}/${action.payload}`
    );

    yield put(
      getUserByIdSuccess(response.data.data)
    );

  } catch (error) {

    yield put(
      getUserByIdFailure(
        error.response?.data?.message || error.message
      )
    );

    errorToast(
      error.response?.data?.message || error.message
    );
  }
}



function* handleCreateUser(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.CREATE_USER,
      action.payload
    );

    successToast(response.data.message);

    yield put(
      createUserSuccess(response.data)
    );
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message;

    yield put(
      createUserFailure(message)
    );

    errorToast(message);
  }
}

// ================= UPDATE USER =================

function* handleUpdateUser(action) {
  try {
    const { id, data } = action.payload;

    const response = yield call(
      axiosInstance.put,
      `${API_ENDPOINTS.UPDATE_USER}/${id}`,
      data
    );

    successToast(response.data.message);

    yield put(updateUserSuccess(response.data));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message;

    yield put(updateUserFailure(message));

    errorToast(message);
  }
}



function* handleDeleteUser(action) {
  try {
    const userId = action.payload;

    const response = yield call(
      axiosInstance.delete,
      `${API_ENDPOINTS.DELETE_USER}/${userId}`
    );

    yield put(deleteUserSuccess(response.data));

  } catch (error) {
    yield put(
      deleteUserFailure(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete user"
      )
    );
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
yield takeLatest(
  getUserByIdRequest.type,
  handleGetUserById
);


 yield takeLatest(
    updateUserRequest.type,
    handleUpdateUser
  );

  yield takeLatest(deleteUserRequest.type, handleDeleteUser);

}