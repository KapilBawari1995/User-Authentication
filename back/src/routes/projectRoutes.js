import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";

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

// ================= CREATE PROJECT =================

router.post(
  "/",
  verifyToken,
  createProject
);

// ================= GET ALL PROJECTS =================

router.get(
  "/",
  verifyToken,
  getProjects
);

// ================= ADD TEAM MEMBERS =================
// IMPORTANT: this must come BEFORE /:id

router.put(
  "/:projectId/team-members",
  verifyToken,
  addTeamMembers
);
// ================= GET PROJECT TEAM MEMBERS =================

router.get(
  "/:projectId/team-members",
  verifyToken,
  getProjectTeamMembers
);


// ================= GET PROJECT BY ID =================

router.get(
  "/:id",
  verifyToken,
  getProjectById
);

// ================= UPDATE PROJECT =================

router.put(
  "/:id",
  verifyToken,
  updateProject
);

// ================= DELETE PROJECT =================

router.delete(
  "/:id",
  verifyToken,
  deleteProject
);

export default router;