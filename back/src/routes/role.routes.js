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


// Update Role
router.put("/:id", verifyToken, updateRole);


// Delete Role
router.delete("/:id", verifyToken, deleteRole);


// Get Single Role
router.get("/:id", verifyToken, getRoleById);


export default router;