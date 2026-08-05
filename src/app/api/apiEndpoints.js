export const API_ENDPOINTS = {

  // ================= AUTH =================

  SIGNUP: "/auth/signup",
  VERIFY_OTP: "/auth/verify-otp",
  LOGIN: "/auth/login",

  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_FORGOT_PASSWORD_OTP: "/auth/verify-forgot-password-otp",
  VERIFYPASSWORD_OTP: "/auth/verifypasswordotp",

  SEND_CHANGE_PASSWORD_OTP: "/auth/send-change-password-otp",
  VERIFY_AND_CHANGE_PASSWORD: "/auth/verify-and-change-password",
  CREATE_NEW_PASSWORD: "/auth/create-new-password",

  // ================= PRODUCTS =================

  GET_PRODUCTS: "/products",
  ADD_PRODUCT: "/products/add",
  DELETE_PRODUCT: "/products",
  UPDATE_PRODUCT: "/products",
  GET_PRODUCT_BY_ID: "/products",

  // ================= ROLES =================

  CREATE_ROLE: "/roles",
  GET_ROLES: "/roles",
  GET_ROLE_BY_ID: "/roles",
  UPDATE_ROLE: "/roles",
  DELETE_ROLE: "/roles",

  // ================= USERS =================

  CREATE_USER: "/users",
  GET_USERS: "/users",
  GET_USER_BY_ID: "/users",
  UPDATE_USER: "/users",
  DELETE_USER: "/users",

  // Assign Role To User
  ASSIGN_ROLE_TO_USER: "/users",

  // ================= PERMISSION MASTER =================

  CREATE_PERMISSION: "/permissions",
  GET_ALL_PERMISSIONS: "/permissions",
  GET_PERMISSION_BY_ID: "/permissions",
  UPDATE_PERMISSION: "/permissions",
  DELETE_PERMISSION: "/permissions",



  // ================= TASK =================

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

  // ================= ROLE PERMISSION =================
GET_PROFILE:"/users/profile/me",

    GET_NOTIFICATIONS: "/notifications",


  GET_ROLE_PERMISSIONS: "/role-permission",
  ASSIGN_ROLE_PERMISSIONS: "/role-permission",

};