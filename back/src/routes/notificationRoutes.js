import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";


import {
  createNotification,
  getNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", verifyToken,createNotification);

router.get("/", verifyToken, getNotifications);

router.get("/:id", verifyToken, getNotificationById);

router.patch("/:id/read", verifyToken, markAsRead);

router.patch("/read/all", verifyToken, markAllAsRead);

router.delete("/:id", verifyToken,deleteNotification);

export default router;