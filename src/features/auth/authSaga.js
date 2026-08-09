import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../app/api/axiosInstance";
import { API_ENDPOINTS } from "../../app/api/apiEndpoints";
import { successToast, errorToast } from "../../utils/toast";

import {
    signupRequest,
    signupSuccess,
    signupFailure,

    verifyOtpRequest,
    verifyOtpSuccess,
    verifyOtpFailure,

    loginRequest,
    loginSuccess,
    loginFailure,

    
 logoutRequest,
  logoutSuccess,
  logoutFailure,


    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,

    sendChangePasswordOtpRequest,
    sendChangePasswordOtpSuccess,
    sendChangePasswordOtpFailure,

    verifyAndChangePasswordRequest,
    verifyAndChangePasswordSuccess,
    verifyAndChangePasswordFailure,

    verifyForgotPasswordOtpRequest,
    verifyForgotPasswordOtpSuccess,
    verifyForgotPasswordOtpFailure,

    createNewPasswordRequest,
    createNewPasswordSuccess,
    createNewPasswordFailure,

} from "./authSlice";


const onSuccess = (message, navigate, path) => {
    successToast(message);

    if (navigate && path) {
        navigate(path);
    }
};



// ================= SIGNUP =================

function* handleSignup(action) {

    try {

        const { data, onSuccessCallback } = action.payload;


        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.SIGNUP,
            data
        );


        localStorage.setItem(
            "verifyEmail",
            data.email
        );


        yield put(signupSuccess());


        successToast(response.data.message);


        if (onSuccessCallback) {
            onSuccessCallback();
        }


    } catch (error) {

        const message =
            error.response?.data?.message || error.message;


        yield put(
            signupFailure(message)
        );


        errorToast(message);

    }
}





// ================= VERIFY OTP =================

function* handleVerifyOtp(action) {

    try {


        const { data, navigate } = action.payload;



        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.VERIFY_OTP,
            data
        );



        const userData = response.data.user;


        const token = response.data.token;



        if (token) {
            localStorage.setItem(
                "token",
                token
            );
        }



        yield put(
            verifyOtpSuccess({

                token,

                user: userData

            })
        );



        onSuccess(
            response.data.message,
            navigate,
            "/welcome"
        );



    } catch (error) {


        const message =
            error.response?.data?.message || error.message;



        yield put(
            verifyOtpFailure(message)
        );


        errorToast(message);

    }

}






// ================= LOGIN =================


function* handleLogin(action) {
    try {
        const { data, navigate } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.LOGIN,
            data
        );

        console.log("API Response:", response.data);

        const token = response.data.token;
        const user = response.data.user;
        const mustChangePassword = response.data.mustChangePassword;

        console.log("TOKEN:", token);
        console.log("USER:", user);



        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        }

        yield put(
            loginSuccess({
                token,
                user,
            })
        );

        successToast(response.data.message);

        if (mustChangePassword) {
            navigate("/admin/change-password");
        } else {
            navigate("/admin/dashboard");
        }


    } catch (error) {
        const message =
            error.response?.data?.message || error.message;

        yield put(loginFailure(message));

        errorToast(message);
    }
}





// ================= FORGOT PASSWORD =================


function* handleForgotPassword(action) {

    try {


        const { data, navigate } = action.payload;



        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.FORGOT_PASSWORD,
            data
        );



        yield put(
            forgotPasswordSuccess()
        );



        onSuccess(
            response.data.message,
            navigate,
            "/login"
        );


    } catch (error) {


        const message =
            error.response?.data?.message || error.message;


        yield put(
            forgotPasswordFailure(message)
        );


        errorToast(message);

    }

}







// ================= SEND CHANGE PASSWORD OTP =================


function* handleSendChangePasswordOtp(action) {


    try {


        const { data, onSuccessCallback } = action.payload;



        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.SEND_CHANGE_PASSWORD_OTP,
            data
        );



        yield put(
            sendChangePasswordOtpSuccess()
        );



        successToast(
            response.data.message
        );



        if (onSuccessCallback) {
            onSuccessCallback();
        }



    } catch (error) {


        const message =
            error.response?.data?.message || error.message;



        yield put(
            sendChangePasswordOtpFailure(message)
        );


        errorToast(message);

    }

}







// ================= VERIFY CHANGE PASSWORD =================


function* handleVerifyAndChangePassword(action) {


    try {


        const { data, onSuccessCallback } = action.payload;



        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.VERIFY_AND_CHANGE_PASSWORD,
            data
        );



        yield put(
            verifyAndChangePasswordSuccess()
        );



        successToast(
            response.data.message
        );



        if (onSuccessCallback) {
            onSuccessCallback();
        }


    } catch (error) {


        const message =
            error.response?.data?.message || error.message;



        yield put(
            verifyAndChangePasswordFailure(message)
        );


        errorToast(message);


    }

}







// ================= VERIFY FORGOT OTP =================


function* handleVerifyForgotPasswordOtp(action) {


    try {


        const {
            data,
            navigate,
            onSuccessCallback

        } = action.payload;




        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.VERIFY_FORGOT_PASSWORD_OTP,
            data
        );



        yield put(
            verifyForgotPasswordOtpSuccess()
        );



        successToast(
            response.data.message
        );



        localStorage.setItem(
            "forgotEmail",
            data.email
        );



        if (onSuccessCallback) {
            onSuccessCallback();
        }



        navigate("/create-new-password");



    } catch (error) {


        const message =
            error.response?.data?.message || error.message;



        yield put(
            verifyForgotPasswordOtpFailure(message)
        );


        errorToast(message);

    }

}








// ================= CREATE NEW PASSWORD =================


function* handleCreateNewPassword(action) {


    try {


        const { data, navigate } = action.payload;



        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.CREATE_NEW_PASSWORD,
            data
        );



        yield put(
            createNewPasswordSuccess()
        );



        successToast(
            response.data.message
        );



        if (navigate) {

            navigate("/login");

        }



    } catch (error) {


        const message =
            error.response?.data?.message || error.message;



        yield put(
            createNewPasswordFailure(message)
        );


        errorToast(message);


    }

}



// ================= LOGOUT =================

function* handleLogout(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      API_ENDPOINTS.LOGOUT
    );

    yield put(logoutSuccess());

    successToast(response.data.message);

    if (action.payload?.navigate) {
      action.payload.navigate("/login");
    }

  } catch (error) {
    const message =
      error.response?.data?.message || error.message;

    yield put(logoutFailure(message));

    errorToast(message);
  }
}





// ================= WATCHER =================


export default function* authSaga() {


    yield takeLatest(
        signupRequest.type,
        handleSignup
    );


    yield takeLatest(
        verifyOtpRequest.type,
        handleVerifyOtp
    );


    yield takeLatest(
        loginRequest.type,
        handleLogin
    );

  yield takeLatest(
    logoutRequest.type,
    handleLogout
  );
    yield takeLatest(
        forgotPasswordRequest.type,
        handleForgotPassword
    );


    yield takeLatest(
        sendChangePasswordOtpRequest.type,
        handleSendChangePasswordOtp
    );


    yield takeLatest(
        verifyAndChangePasswordRequest.type,
        handleVerifyAndChangePassword
    );


    yield takeLatest(
        verifyForgotPasswordOtpRequest.type,
        handleVerifyForgotPasswordOtp
    );


    yield takeLatest(
        createNewPasswordRequest.type,
        handleCreateNewPassword
    );

}