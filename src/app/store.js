import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import productReducer from "../features/product/productSlice";
import productSaga from "../features/product/productSaga";

import authReducer from "../features/auth/authSlice";
import authSaga   from  "../features/auth/authSaga";

import roleReducer from  '../features/Role/roleSlice';
import roleSaga  from '../features/Role/roleSaga';


import Userreducer from '../features/user/userSlice';
import usersaga   from '../features/user/userSaga';

import permissionsReducer from '../features/permissions/permissionSlice';
import permissionsSaga from '../features/permissions/permissionSaga'
import taskReducer from  '../features/task/taskSlice';
import taskSaga from '../features/task/taskSaga';


import projectReducer  from '../features/project/projectSlice';
import projectSaga from '../features/project/projectSaga';

function* rootSaga() {
  yield all([
    productSaga(),
    authSaga(),
    roleSaga(),
    usersaga(),
    permissionsSaga(),
    taskSaga(),
    projectSaga(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productReducer, 
    auth :authReducer,
    role: roleReducer,
    user:Userreducer,
    permissions:permissionsReducer,
    task:taskReducer,
    project:projectReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);