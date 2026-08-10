import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Welcome from "./pages/auth/Welcome";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateNewPassword from "./pages/auth/CreateNewPassword";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Tasks from "./pages/admin/Tasks/Tasks";
import AddTask from "./pages/admin/Tasks/AddTask";
import Project from "./pages/admin/Project/Projects";
import AddProject from "./pages/admin/Project/AddProject";
import ProjectDetails from "./pages/admin/Project/ProjectDetails";
import Calendar from "./pages/admin/Calendar";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications/Notifications";
import Profile from "./pages/admin/Profile";
import Department from "./pages/admin/Department/Department";
import AddDepartment from './pages/admin/Department/AddDepartment'
import AssignManager from "./pages/admin/AssignManager/AssignManager"
import SettingsPage from "./pages/admin/Settings";
import ChangePassword from "./pages/admin/ChangePassword";
import Roles from "./pages/admin/role/Roles";
import AddRole from "./pages/admin/role/AddRole";
import User from "./pages/admin/user/User";
import AddUser from "./pages/admin/user/UaerAdd";
import PermissionManagement from "./pages/admin/PermissionManagement/PermissionManagement";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }


  if (
    user?.mustChangePassword &&
    location.pathname !== "/admin/change-password"
  ) {
    return <Navigate to="/admin/change-password" replace />;
  }


  // if (
  //   user?.role?.name === "User" &&
  //   (!user?.permissions || user.permissions.length === 0)
  // ) {

  //   if (location.pathname !== "/welcome") {
  //     return <Navigate to="/welcome" replace />;
  //   }

  // }


  return children;
};

const PublicRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return children;
  }

  if (user?.mustChangePassword) {
    return <Navigate to="/admin/change-password" replace />;
  }

  return <Navigate to="/admin/dashboard" replace />;
};

function AppContent() {
  return (
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

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/create-new-password" element={<CreateNewPassword />} />
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
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/edit/:id" element={<AddUser />} />

        <Route path="tasks" element={<Tasks />} />
      

        <Route path="projects" element={<Project />} />  
        <Route path="projects/add" element={<AddProject />} />


        <Route
          path="/admin/projects/:projectId/tasks/create"
          element={<AddTask />}
        />
        <Route
          path="projects/:projectId"
          element={<ProjectDetails />}
        />
       <Route
  path="/admin/projects/:projectId/tasks/create"
  element={<AddTask />}

/>
<Route
  path="/admin/projects/:projectId/tasks/edit/:id"
  element={<AddTask />}
/>
        <Route path="calendar" element={<Calendar />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="department" element={<Department />} />
        <Route path="department/add" element={<AddDepartment />} />


        <Route path="assign-manager" element={<AssignManager />} />

        <Route path="roles" element={<Roles />} />
        <Route path="roles/addrole" element={<AddRole />} />

        <Route
          path="permission-management"
          element={<PermissionManagement />}
        />

        <Route path="settings" element={<SettingsPage />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}