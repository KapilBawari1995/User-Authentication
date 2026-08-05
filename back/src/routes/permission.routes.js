import express from "express";

import {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from "../controllers/permission.controller.js";


import verifyToken from "../middlewares/authMiddleware.js";


const router = express.Router();


// Create Permission
router.post("/", verifyToken, createPermission);


// Get All Permissions
router.get("/", verifyToken, getAllPermissions);


// Get Permission By Id
router.get("/:id", verifyToken, getPermissionById);


// Update Permission
router.put("/:id", verifyToken, updatePermission);


// Delete Permission
router.delete("/:id", verifyToken, deletePermission);


export default router;