import express from "express";

import {
  getReports,
} from "../controllers/report.controller.js";

const router = express.Router();

// =====================================================
// GET REPORT OVERVIEW
// GET /api/v1/reports
// =====================================================

router.get("/", getReports);

export default router;