import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Welcome from "./pages/auth/Welcome";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateNewPassword from "./pages/auth/CreateNewPassword";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Tasks from './pages/admin/Tasks/Tasks'
import AddTask from "./pages/admin/Tasks/AddTask";

import Project from './pages/admin/Project/Projects'
import AddProject from "./pages/admin/Project/AddProject";
import Calendar from "./pages/admin/Calendar";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications/Notifications";
import Profile from "./pages/admin/Profile";
import SettingsPage from "./pages/admin/Settings";
import ChangePassword from "./pages/admin/ChangePassword";
import Roles from "./pages/admin/role/Roles"
import AddRole from './pages/admin/role/AddRole'
import User from './pages/admin/user/User'
import AddUser from './pages/admin/user/UaerAdd'



import PermissionManagement from "./pages/admin/PermissionManagement/PermissionManagement";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  return token ? children : <Navigate to="/login" />;
};


const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  return !token ? children : <Navigate to="/admin/dashboard" />;
};


function App() {
  return (
    <Router>

      <Routes>

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOtp />
            </PublicRoute>
          }
        />


        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/create-new-password"
          element={<CreateNewPassword />}
        />


        {/* User Welcome */}
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />


        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="users"
            element={<User />}
          />

          <Route
            path="users/add"
            element={<AddUser />}
          />
          <Route
            path="tasks"
            element={<Tasks />}
          />

          <Route
            path="tasks/create"
            element={<AddTask />}
          />

          <Route
            path="projects"
            element={<Project />}
          />

          <Route
            path="projects/creat"
            element={<AddProject />}
          />
          <Route
            path="calendar"
            element={<Calendar />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />


          <Route
            path="notifications"
            element={<Notifications />}
          />


          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="roles"
            element={<Roles />}
          />

          <Route
            path="roles/addrole"
            element={<AddRole />}
          />


          <Route
            path="permission-management"
            element={<PermissionManagement />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />

          <Route
            path="change-password"
            element={<ChangePassword />}
          />



        </Route>


        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </Router>
  );
}


export default App;