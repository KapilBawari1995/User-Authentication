# MERN Enterprise Task & Project Management System

A full-stack Enterprise Task & Project Management System built using the MERN Stack. The application provides secure authentication, role-based access control (RBAC), user management, project management, task management, and an automated notification system with a scalable architecture.

---

# Features

## Authentication

- User Registration
- Email OTP Verification
- Secure Login
- JWT Authentication
- Protected Routes
- Forgot Password
- Reset Password using OTP
- Change Password
- Password Encryption using bcrypt
- Session Management

---

## User Management

- Create User
- Update User
- Delete User
- User Listing
- Search Users
- Pagination

---

## Role & Permission Management (RBAC)

- Create Roles
- Update Roles
- Delete Roles
- Assign Permissions
- Menu-based Permission System
- Role-based Sidebar
- Protected Modules
- Super Admin Support

---

## Project Management

- Create Project
- Update Project
- Delete Project
- Project Listing
- Search Projects
- Pagination
- Assign Project Manager
- Assign Team Members

---

## Task Management

- Create Task
- Update Task
- Delete Task
- Task Listing
- Search Tasks
- Pagination
- Assign Tasks to Users
- Task Priority
- Task Status
- Due Date Management

---

## Notification System

- Automatic Notification on Task Assignment
- Automatic Notification on Project Assignment
- Mark Notification as Read
- Mark All Notifications as Read
- Delete Notification
- Notification History

---

## Dashboard

- Dashboard Statistics
- Total Users
- Active Users
- Blocked Users
- Total Projects
- Total Tasks
- Pending Tasks
- Completed Tasks

---

# Tech Stack

## Frontend

- React.js
- Redux Toolkit
- Redux Saga
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js
- Nodemailer
- REST APIs

---

# Modules

- Authentication
- Users
- Roles
- Permissions
- Projects
- Tasks
- Notifications
- Dashboard

---

# Authentication Flow

1. User Registration
2. Email OTP Verification
3. Login
4. Forgot Password
5. Verify OTP
6. Reset Password
7. Change Password

---

# RBAC Flow

- Super Admin
- Admin
- Project Manager
- Employee

Permissions are dynamically controlled based on assigned roles.

---

# Project Workflow

```
Super Admin
      │
      ▼
Create Project
      │
      ▼
Assign Project Manager
      │
      ▼
Assign Team Members
      │
      ▼
Project Notifications
```

---

# Task Workflow

```
Project Manager
      │
      ▼
Create Task
      │
      ▼
Assign Employee
      │
      ▼
Automatic Notification
      │
      ▼
Employee Updates Status
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=4000

MONGODB_URI=

JWT_SECRET=

EMAIL_USER=

EMAIL_PASS=
```

---

# API Modules

## Authentication APIs

- Register
- Verify OTP
- Login
- Forgot Password
- Verify Forgot OTP
- Reset Password
- Change Password

## User APIs

- Create User
- Get Users
- Update User
- Delete User

## Role APIs

- Create Role
- Update Role
- Delete Role
- Assign Permissions

## Project APIs

- Create Project
- Get Projects
- Update Project
- Delete Project

## Task APIs

- Create Task
- Get Tasks
- Update Task
- Delete Task
- Change Task Status

## Notification APIs

- Get Notifications
- Mark as Read
- Mark All as Read
- Delete Notification

---

# Project Highlights

- Enterprise Architecture
- JWT Authentication
- OTP Verification
- RBAC (Role-Based Access Control)
- Dynamic Sidebar
- Task Management
- Project Management
- Automatic Notifications
- RESTful APIs
- Redux Toolkit
- Redux Saga
- Tailwind CSS
- Responsive UI
- Clean Folder Structure
- Scalable Codebase

---

# Future Enhancements

- Real-time Notifications (Socket.IO)
- File Uploads
- Project Reports
- Activity Logs
- Calendar Integration
- Email Notifications
- Team Chat
- Dashboard Analytics
- Dark Mode
- Audit Logs

---

# Author

**Kapil Bawari**

React Developer | MERN Stack Developer


Role-Based Project & Task Management Workflow

<img width="1366" height="1068" alt="admin" src="https://github.com/user-attachments/assets/8555c9b0-1734-4c81-9777-440b91963c73" />

Admin – Project Management

Admin creates and manages projects and assigns a Manager to the project.

<img width="1366" height="751" alt="manger" src="https://github.com/user-attachments/assets/e1fc76d0-93ca-4bb9-b3e1-11e55480e6af" />

Manager – Assigned Projects

Manager logs in and views the projects assigned to them by the Admin


<img width="1366" height="1356" alt="mangertask" src="https://github.com/user-attachments/assets/f282fd51-292e-4f1d-a9b4-c9ba2d54327d" />

Manager – Team & Task Management

Manager opens the assigned project, adds team members and creates/assigns tasks to Developers.

<img width="1366" height="751" alt="devlop" src="https://github.com/user-attachments/assets/1602702d-f337-4d83-b008-b06a5c912b13" />


Developer – Assigned Project

Developer logs in and sees the project assigned to them based on their role and permissions


<img width="1366" height="1271" alt="dev2" src="https://github.com/user-attachments/assets/537f1952-c413-4695-8a63-89d24c81393e" />


Developer – Assigned Tasks

Developer opens the assigned project and views the tasks assigned by the Manager with priority, status and due dates.


Admin creates project
        ↓
Admin assigns Manager
        ↓
Manager views assigned project
        ↓
Manager adds team members
        ↓
Manager assigns tasks
        ↓
Developer views assigned project
        ↓
Developer views assigned tasks







