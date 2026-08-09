import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";

import { API_ENDPOINTS } from "../../app/api/apiEndpoints";

import { successToast, errorToast } from "../../utils/toast";



import {

    getTasksRequest,
    getTasksSuccess,
    getTasksFailure,

    createTaskRequest,
    createTaskSuccess,
    createTaskFailure,

    updateTaskRequest,
    updateTaskSuccess,
    updateTaskFailure,

    getTaskByIdRequest,
  getTaskByIdSuccess,
  getTaskByIdFailure,


    deleteTaskRequest,
    deleteTaskSuccess,
    deleteTaskFailure,

} from "./taskSlice";



// ================= GET TASK LIST =================


function* handleGetTasks(action){

    try{


        const response = yield call(

            axiosInstance.get,

            API_ENDPOINTS.GET_TASKS,

            {
                params: action.payload
            }

        );


        yield put(
            getTasksSuccess(
                response.data
            )
        );


    }
    catch(error){

        yield put(
            getTasksFailure(
                error.response?.data?.message ||
                error.message
            )
        );

    }

}



// ================= CREATE TASK =================


function* handleCreateTask(action){

    try{


        const response = yield call(

            axiosInstance.post,

            API_ENDPOINTS.CREATE_TASK,

            action.payload

        );

        console.log(response)

        yield put(
            createTaskSuccess(
                response.data.data
            )
        );

                successToast(response.data.message);



    }
    catch(error){


        yield put(
            createTaskFailure(
                error.response?.data?.message ||
                error.message
            )
        );

                errorToast(message);

    }

}


function* handleGetTaskById(action) {
  try {
    const response = yield call(
      axiosInstance.get,
      `${API_ENDPOINTS.GET_TASK_BY_ID}/${action.payload}`
    );

    yield put(getTaskByIdSuccess(response.data.data));
  } catch (error) {
    yield put(
      getTaskByIdFailure(
        error.response?.data?.message || "Failed to fetch task."
      )
    );
  }
}

// ================= UPDATE TASK =================


function* handleUpdateTask(action){

    try{


        const {id,data}=action.payload;


        const response = yield call(

            axiosInstance.put,

            `${API_ENDPOINTS.UPDATE_TASK}/${id}`,

            data

        );



        yield put(

            updateTaskSuccess(
                response.data.data
            )

        );
                successToast(response.data.message);


    }
    catch(error){


        yield put(

            updateTaskFailure(
                error.response?.data?.message ||
                error.message
            )

        );

        
                errorToast(message);

    }

}




// ================= DELETE TASK =================


function* handleDeleteTask(action) {
  try {

    const response = yield call(
      axiosInstance.delete,
      `${API_ENDPOINTS.DELETE_TASK}/${action.payload}`
    );

    yield put(deleteTaskSuccess(action.payload));

    successToast(response.data.message);

  } catch (error) {

    yield put(
      deleteTaskFailure(
        error.response?.data?.message || error.message
      )
    );

    errorToast(
      error.response?.data?.message || error.message
    );
  }
}


// ================= WATCHER =================


export default function* taskSaga(){


    yield takeLatest(

        getTasksRequest.type,

        handleGetTasks

    );



    yield takeLatest(

        createTaskRequest.type,

        handleCreateTask

    );
yield takeLatest(getTaskByIdRequest.type, handleGetTaskById);


    yield takeLatest(

        updateTaskRequest.type,

        handleUpdateTask

    );



    yield takeLatest(

        deleteTaskRequest.type,

        handleDeleteTask

    );


}