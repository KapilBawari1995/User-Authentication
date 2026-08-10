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


router.post(
  "/",
  verifyToken,
  createProject
);


router.get(
  "/",
  verifyToken,
  getProjects
);



router.put(
  "/:projectId/team-members",
  verifyToken,
  addTeamMembers
);

router.get(
  "/:projectId/team-members",
  verifyToken,
  getProjectTeamMembers
);



router.get(
  "/:id",
  verifyToken,
  getProjectById
);


router.put(
  "/:id",
  verifyToken,
  updateProject
);


router.delete(
  "/:id",
  verifyToken,
  deleteProject
);

export default router;