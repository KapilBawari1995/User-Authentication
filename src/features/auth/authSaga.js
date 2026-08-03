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

function* handleSignup(action) {
    try {
        const { data, onSuccessCallback } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.SIGNUP,
            data
        );

        localStorage.setItem("verifyEmail", data.email);
        yield put(signupSuccess());
        successToast(response.data.message);

        if (onSuccessCallback) {
            onSuccessCallback();
        }
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        yield put(signupFailure(message));
        errorToast(message);
    }
}

function* handleVerifyOtp(action) {
    try {
        const { data, navigate } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.VERIFY_OTP,
            data
        );

        const token = response.data.token;
        if (token) {
            localStorage.setItem("token", token);
        }

        yield put(
            verifyOtpSuccess({
                token: token,
                user: response.data.user,
            })
        );

        onSuccess(
            response.data.message,
            navigate,
            "/welcome"
        );

    } catch (error) {
        const message = error.response?.data?.message || error.message;
        yield put(verifyOtpFailure(message));
        errorToast(message);
    }
}

function* handleLogin(action) {
    try {
        const { data, navigate } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.LOGIN,
            data
        );

        const token = response.data.data.token;
        if (token) {
            localStorage.setItem("token", token);
        }

        yield put(
            loginSuccess({
                token: token,
                user: response.data.data,
            })
        );

        onSuccess(
            response.data.message,
            navigate,
            "/welcome"
        );

    } catch (error) {
        const message = error.response?.data?.message || error.message;
        yield put(loginFailure(message));
        errorToast(message);
    }
}

function* handleForgotPassword(action) {
    try {
        const { data, navigate } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.FORGOT_PASSWORD,
            data
        );

        yield put(forgotPasswordSuccess());
        onSuccess(response.data.message, navigate, "/login");
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        yield put(forgotPasswordFailure(message));
        errorToast(message);
    }
}

function* handleSendChangePasswordOtp(action) {
    try {
        const { data, onSuccessCallback } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.SEND_CHANGE_PASSWORD_OTP,
            data
        );

        yield put(sendChangePasswordOtpSuccess());
        successToast(response.data.message);

        if (onSuccessCallback) {
            onSuccessCallback(); 
        }
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        yield put(sendChangePasswordOtpFailure(message));
        errorToast(message);
    }
}

function* handleVerifyAndChangePassword(action) {
    try {
        const { data, onSuccessCallback } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.VERIFY_AND_CHANGE_PASSWORD,
            data
        );

        yield put(verifyAndChangePasswordSuccess());
        successToast(response.data.message);

        if (onSuccessCallback) {
            onSuccessCallback(); 
        }
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        yield put(verifyAndChangePasswordFailure(message));
        errorToast(message);
    }
}

function* handleVerifyForgotPasswordOtp(action) {
    try {
        const { data, navigate, onSuccessCallback } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.VERIFY_FORGOT_PASSWORD_OTP,
            data
        );
        console.log("API Response =>", response.data);
        yield put(verifyForgotPasswordOtpSuccess());

        successToast(response.data.message);

        if (onSuccessCallback) {
            onSuccessCallback();
        }
        console.log("Navigate:", navigate);

        localStorage.setItem("forgotEmail", data.email);
        navigate("/create-new-password");



        console.log("OTP Verify Success");
        console.log(data);
        console.log(navigate);
    } catch (error) {
        const message =
            error.response?.data?.message || error.message;

        yield put(
            verifyForgotPasswordOtpFailure(message)
        );

        errorToast(message);
    }
}


function* handleCreateNewPassword(action) {
    try {
        const { data, navigate } = action.payload;

        const response = yield call(
            axiosInstance.post,
            API_ENDPOINTS.CREATE_NEW_PASSWORD,
            data
        );

        yield put(createNewPasswordSuccess());

        successToast(response.data.message);

        if (navigate) {
            navigate("/login");
        }

    } catch (error) {
        const message =
            error.response?.data?.message || error.message;

        yield put(createNewPasswordFailure(message));

        errorToast(message);
    }
}



export default function* authSaga() {
    yield takeLatest(signupRequest.type, handleSignup);
    yield takeLatest(verifyOtpRequest.type, handleVerifyOtp);
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(forgotPasswordRequest.type, handleForgotPassword);
    yield takeLatest(sendChangePasswordOtpRequest.type, handleSendChangePasswordOtp);
    yield takeLatest(verifyAndChangePasswordRequest.type, handleVerifyAndChangePassword);
    yield takeLatest(verifyForgotPasswordOtpRequest.type, handleVerifyForgotPasswordOtp);
    yield takeLatest(createNewPasswordRequest.type, handleCreateNewPassword);


}