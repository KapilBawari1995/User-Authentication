import { call, put, takeLatest } from "redux-saga/effects";

import axiosInstance from "../../app/api/axiosInstance";

import { API_ENDPOINTS } from "../../app/api/apiEndpoints";


import {

    getNotificationsRequest,

    getNotificationsSuccess,

    getNotificationsFailure

} from "./notificationSlice";




// ================= GET NOTIFICATIONS =================


function* handleGetNotifications(action){

    try{


        const response = yield call(

            axiosInstance.get,

            `${API_ENDPOINTS.GET_NOTIFICATIONS}`

        );


        yield put(

            getNotificationsSuccess({

                data:response.data.data,

                totalCount:response.data.totalCount

            })

        );


    }
    catch(error){


        yield put(

            getNotificationsFailure(

                error.response?.data?.message || error.message

            )

        );


    }


}




// ================= WATCHER =================


export default function* notificationSaga(){


    yield takeLatest(

        getNotificationsRequest.type,

        handleGetNotifications

    );


}