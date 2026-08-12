import express from "express";

import {
  getCalendarEvents,
  getTodayCalendarEvents,
  getCalendarById,
} from "../controllers/calendar.controller.js";

import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// =====================================================
// GET ALL CALENDAR TASKS
// GET /api/v1/calendar
// GET /api/v1/calendar?startDate=2026-08-01&endDate=2026-08-31
// =====================================================

router.get(
  "/",
  verifyToken,
  getCalendarEvents
);

// =====================================================
// GET TODAY'S TASKS
// GET /api/v1/calendar/today
// =====================================================

router.get(
  "/today",
  verifyToken,
  getTodayCalendarEvents
);

// =====================================================
// GET CALENDAR TASK BY ID
// GET /api/v1/calendar/:id
// =====================================================

router.get(
  "/:id",
  verifyToken,
  getCalendarById
);

export default router;