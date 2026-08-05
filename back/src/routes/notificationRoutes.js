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

// Create Notification
router.post("/", verifyToken, createNotification);

// Get All Notifications
router.get("/", verifyToken, getNotifications);

// Get Notification By Id
router.get("/:id", verifyToken, getNotificationById);

// Mark Single Notification Read
router.patch("/:id/read", verifyToken, markAsRead);

// Mark All Notifications Read
router.patch("/read/all", verifyToken, markAllAsRead);

// Delete Notification
router.delete("/:id", verifyToken, deleteNotification);

export default router;