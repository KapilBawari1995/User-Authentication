import express from "express";

import verifyToken from "../middlewares/authMiddleware.js";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

// =====================================================
// GET SETTINGS
// =====================================================

router.get(
  "/",
  verifyToken,
  getSettings
);

// =====================================================
// UPDATE SETTINGS
// =====================================================

router.put(
  "/",
  verifyToken,
  updateSettings
);

export default router;