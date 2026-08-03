import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import productReducer from "../features/product/productSlice";
import productSaga from "../features/product/productSaga";

import authReducer from "../features/auth/authSlice";
import authSaga   from  "../features/auth/authSaga";

function* rootSaga() {
  yield all([
    productSaga(),
    authSaga(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productReducer, 
    auth :authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);