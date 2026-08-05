import { call, put, takeLatest } from "redux-saga/effects";


import axiosInstance from "../../app/api/axiosInstance";


import { API_ENDPOINTS } from "../../app/api/apiEndpoints";


import {

    getProfileRequest,
    getProfileSuccess,
    getProfileFailure

} from "./profileSlice";




// ================= GET PROFILE =================


function* handleGetProfile(){


    try{


        const response = yield call(

            axiosInstance.get,

            API_ENDPOINTS.GET_PROFILE

        );

        yield put(

            getProfileSuccess(
                response.data.data

            )

        );



    }catch(error){


        yield put(

            getProfileFailure(

                error.response?.data?.message ||
                error.message

            )

        );


    }


}




export default function* profileSaga(){


    yield takeLatest(

        getProfileRequest.type,

        handleGetProfile

    );


}