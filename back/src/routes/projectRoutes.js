import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
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