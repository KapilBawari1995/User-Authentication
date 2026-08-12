import express from "express";

import verifyToken from "../middlewares/authMiddleware.js";
import hasPermission from "../middlewares/hasPermission.js";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addTeamMembers,
  getProjectTeamMembers,
} from "../controllers/projectController.js";

const router = express.Router();

// =====================================================
// CREATE PROJECT
// =====================================================

router.post(
  "/",
  verifyToken,
  hasPermission("Projects", "create"),
  createProject
);

// =====================================================
// GET PROJECTS
// =====================================================

router.get(
  "/",
  verifyToken,
  hasPermission("Projects", "view"),
  getProjects
);

// =====================================================
// ADD TEAM MEMBERS
// =====================================================

router.put(
  "/:projectId/team-members",
  verifyToken,
  hasPermission("Projects", "edit"),
  addTeamMembers
);

// =====================================================
// GET PROJECT TEAM MEMBERS
// =====================================================

router.get(
  "/:projectId/team-members",
  verifyToken,
  hasPermission("Projects", "view"),
  getProjectTeamMembers
);

// =====================================================
// GET PROJECT BY ID
// =====================================================

router.get(
  "/:id",
  verifyToken,
  hasPermission("Projects", "view"),
  getProjectById
);

// =====================================================
// UPDATE PROJECT
// =====================================================

router.put(
  "/:id",
  verifyToken,
  hasPermission("Projects", "edit"),
  updateProject
);

// =====================================================
// DELETE PROJECT
// =====================================================

router.delete(
  "/:id",
  verifyToken,
  hasPermission("Projects", "delete"),
  deleteProject
);

export default router;