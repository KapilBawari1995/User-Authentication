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


router.post("/", verifyToken, createPermission);

router.get("/", verifyToken, getAllPermissions);


router.get("/:id", verifyToken, getPermissionById);
router.put("/:id", verifyToken, updatePermission);
router.delete("/:id", verifyToken, deletePermission);


export default router;