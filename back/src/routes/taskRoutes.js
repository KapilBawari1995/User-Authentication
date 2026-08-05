import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  changeTaskStatus,
} from "../controllers/taskController.js";

import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();


// ================= Create Task =================
router.post(
  "/tasks",
  verifyToken,
  createTask
);


// ================= Get All Tasks =================
router.get(
  "/tasks",
  verifyToken,
  getTasks
);


// ================= Get Task By Id =================
router.get(
  "/tasks/:id",
  verifyToken,
  getTaskById
);


// ================= Update Task =================
router.put(
  "/tasks/:id",
  verifyToken,
  updateTask
);


// ================= Delete Task =================
router.delete(
  "/tasks/:id",
  verifyToken,
  deleteTask
);


// ================= Change Status =================
router.patch(
  "/tasks/:id/status",
  verifyToken,
  changeTaskStatus
);

export default router;