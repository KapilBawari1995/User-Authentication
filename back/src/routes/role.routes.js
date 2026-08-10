import express from "express";

import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";

import {
  assignPermissionToRole,
} from "../controllers/rolePermission.controller.js";

import verifyToken from "../middlewares/authMiddleware.js";


const router = express.Router();


// Create Role
router.post("/", verifyToken, createRole);


// Get All Roles
router.get("/", verifyToken, getAllRoles);


// Assign Permission To Role
router.put(
  "/:roleId/permissions",
  verifyToken,
  assignPermissionToRole
);


router.put("/:id", verifyToken, updateRole);


router.delete("/:id", verifyToken, deleteRole);


router.get("/:id", verifyToken, getRoleById);


export default router;