import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";

import { API_ENDPOINTS } from "../../app/api/apiEndpoints";


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


    }
    catch(error){


        yield put(
            createTaskFailure(
                error.response?.data?.message ||
                error.message
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


    }
    catch(error){


        yield put(

            updateTaskFailure(
                error.response?.data?.message ||
                error.message
            )

        );

    }

}




// ================= DELETE TASK =================


function* handleDeleteTask(action){

    try{


        yield call(

            axiosInstance.delete,

            `${API_ENDPOINTS.DELETE_TASK}/${action.payload}`

        );



        yield put(

            deleteTaskSuccess(
                action.payload
            )

        );


    }
    catch(error){


        yield put(

            deleteTaskFailure(
                error.response?.data?.message ||
                error.message
            )

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



    yield takeLatest(

        updateTaskRequest.type,

        handleUpdateTask

    );



    yield takeLatest(

        deleteTaskRequest.type,

        handleDeleteTask

    );


}