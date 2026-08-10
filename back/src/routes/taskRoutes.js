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



router.post(
  "/tasks",
  verifyToken,
  createTask
);



router.get(
  "/tasks",
  verifyToken,
  getTasks
);


router.get(
  "/tasks/:id",
  verifyToken,
  getTaskById
);


router.put(
  "/tasks/:id",
  verifyToken,
  updateTask
);


router.delete(
  "/tasks/:id",
  verifyToken,
  deleteTask
);


router.patch(
  "/tasks/:id/status",
  verifyToken,
  changeTaskStatus
);

export default router;