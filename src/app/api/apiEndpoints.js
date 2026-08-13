export const API_ENDPOINTS = {


  SIGNUP: "/auth/signup",
  VERIFY_OTP: "/auth/verify-otp",
  LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",


  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_FORGOT_PASSWORD_OTP: "/auth/verify-forgot-password-otp",
  VERIFYPASSWORD_OTP: "/auth/verifypasswordotp",

  SEND_CHANGE_PASSWORD_OTP: "/auth/send-change-password-otp",
  VERIFY_AND_CHANGE_PASSWORD: "/auth/verify-and-change-password",
  CREATE_NEW_PASSWORD: "/auth/create-new-password",


  GET_PRODUCTS: "/products",
  ADD_PRODUCT: "/products/add",
  DELETE_PRODUCT: "/products",
  UPDATE_PRODUCT: "/products",
  GET_PRODUCT_BY_ID: "/products",


  CREATE_ROLE: "/roles",
  GET_ROLES: "/roles",
  GET_ROLE_BY_ID: "/roles",
  UPDATE_ROLE: "/roles",
  DELETE_ROLE: "/roles",


  CREATE_USER: "/users",
  GET_USERS: "/users",
  GET_USER_BY_ID: "/users",
  UPDATE_USER: "/users",
  DELETE_USER: "/users",
SETTINGS: "/settings",

  // Assign Role To User
  ASSIGN_ROLE_TO_USER: "/users",


  CREATE_PERMISSION: "/permissions",
  GET_ALL_PERMISSIONS: "/permissions",
  GET_PERMISSION_BY_ID: "/permissions",
  UPDATE_PERMISSION: "/permissions",
  DELETE_PERMISSION: "/permissions",




    GET_TASKS: "/tasks",
    CREATE_TASK: "/tasks",
    GET_TASK_BY_ID: "/tasks",
    UPDATE_TASK: "/tasks",
    DELETE_TASK: "/tasks",



CREATE_PROJECT: "/projects",
GET_PROJECTS: "/projects",
GET_PROJECT_BY_ID: "/projects",
UPDATE_PROJECT: "/projects",
DELETE_PROJECT: "/projects",
ADD_TEAM_MEMBERS: "/projects",
  ADD_TEAM_MEMBER: "/projects",
GET_PROJECT_TEAM_MEMBERS: "/projects",


CREATE_DEPARTMENT: "/departments",
GET_DEPARTMENTS: "/departments",
GET_DEPARTMENT_BY_ID: "/departments",
UPDATE_DEPARTMENT: "/departments",
DELETE_DEPARTMENT: "/departments",
GET_DEPARTMENT_MANAGERS: "/departments",
ASSIGN_DEPARTMENT_MANAGER: "/departments",

GET_DASHBOARD: "/dashboard",

GET_PROFILE:"/users/profile/me",

    GET_NOTIFICATIONS: "/notifications",
  GET_ROLE_PERMISSIONS: "/role-permission",
  ASSIGN_ROLE_PERMISSIONS: "/role-permission",

  CALENDAR: "/calendar",
GET_CALENDAR: "/calendar",
GET_CALENDAR_TODAY: "/calendar/today",
GET_CALENDAR_BY_ID: "/calendar",
CREATE_CALENDAR: "/calendar",
UPDATE_CALENDAR: "/calendar",
DELETE_CALENDAR: "/calendar",


 GET_REPORT_OVERVIEW: "/reports",

};