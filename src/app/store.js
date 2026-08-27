import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import productReducer from "../features/product/productSlice";
import productSaga from "../features/product/productSaga";

import authReducer from "../features/auth/authSlice";
import authSaga   from  "../features/auth/authSaga";

import roleReducer from  '../features/role/roleSlice';
import roleSaga  from '../features/role/roleSaga';


import Userreducer from '../features/user/userSlice';
import usersaga   from '../features/user/userSaga';

import permissionsReducer from '../features/permissions/permissionSlice';
import permissionsSaga from '../features/permissions/permissionSaga'
import taskReducer from  '../features/task/taskSlice';
import taskSaga from '../features/task/taskSaga';


import projectReducer  from '../features/project/projectSlice';
import projectSaga from '../features/project/projectSaga';


import notificationReducer from "../features/notification/notificationSlice";
import notificationSaga from "../features/notification/notificationSaga";


import profileReducer from '../features/profile/profileSlice';
import profileSaga from '../features/profile/profileSaga';

import departmentReducer from '../features/department/departmentSlice';
import departmentSaga from '../features/department/departmentSaga';

import dashboardRedeucer from '../features/dashboard/dashboardSlice';
import dashboardSaga from '../features/dashboard/dashboardSaga';

import calendarReducer from '../features/calendar/calendarSlice';
import calendarSaga from  '../features/calendar/calendarSaga';

import reportsReducer from '../features/reports/reportSlice';
import reportsSaga from '../features/reports/reportSaga'

import settingsReducer from  "../features/settings/settingsSlice";
import settingsSaga from   '../features/settings/settingsSaga';

function* rootSaga() {
  yield all([
    productSaga(),
    authSaga(),
    roleSaga(),
    usersaga(),
    permissionsSaga(),
    taskSaga(),
    projectSaga(),
    notificationSaga(),
    profileSaga(),
    departmentSaga(),
    dashboardSaga(),
    calendarSaga(),
    reportsSaga(),
    settingsSaga(),
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
    notification:notificationReducer,
    profile:profileReducer,
    department:departmentReducer,
    dashboard:dashboardRedeucer,
    calendar:calendarReducer,
    reports:reportsReducer,
   settings: settingsReducer,

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);