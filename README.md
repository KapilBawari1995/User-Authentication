# MERN Authentication & Product Management System

A modern full-stack MERN application that provides secure user authentication and complete product management functionality. The project is built using React, Redux Toolkit, Redux Saga, Node.js, Express.js, and MongoDB with a clean and responsive user interface.

---

## Features

### Authentication
- User Registration (Sign Up)
- Email OTP Verification
- Secure User Login
- JWT Authentication
- Protected Routes
- Forgot Password
- Email OTP Verification for Password Reset
- Create New Password
- Change Password (Old Password + OTP Verification)
- Secure Password Hashing using bcrypt

### Product Management
- Add Product
- Update Product
- Delete Product
- Product Listing
- Product Search
- Pagination
- Responsive Product Table

### Frontend
- React.js
- Redux Toolkit
- Redux Saga
- React Router DOM
- Axios API Integration
- Responsive UI
- Toast Notifications

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt Password Encryption
- Nodemailer Email Service
- REST APIs

---

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Redux Saga
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Nodemailer

---

## Authentication Flow

1. User Registration
2. Email OTP Verification
3. Login
4. Forgot Password
5. Verify Forgot Password OTP
6. Create New Password
7. Login with New Password
8. Change Password (After Login)

---

## Product Module

- Create Product
- Read Products
- Update Product
- Delete Product
- Search Products
- Pagination

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
```

### Install Frontend

```bash
cd client
npm install
npm run dev
```

### Install Backend

```bash
cd server
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## API Modules

### Authentication APIs

- Register User
- Verify OTP
- Login
- Forgot Password
- Verify Forgot Password OTP
- Create New Password
- Send Change Password OTP
- Verify & Change Password

### Product APIs

- Get Products
- Add Product
- Update Product
- Delete Product

---

## Project Highlights

- Secure Authentication
- Email OTP Verification
- JWT Authorization
- Password Encryption
- Product CRUD Operations
- Search & Pagination
- Redux Toolkit
- Redux Saga
- REST APIs
- Responsive Design
- Clean Code Structure

---

## Future Improvements

- User Profile
- Image Upload
- Role-Based Authentication
- Dashboard Analytics
- Order Management
- Dark Mode

---

## Author

Developed by **Kapil Bawari**
