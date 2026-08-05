import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";

import {
  assignPermissionToRole,
  getRolePermissions,
} from "../controllers/rolePermission.controller.js";

const router = express.Router();

// ================= Assign Permissions To Role =================
router.put(
  "/:roleId",
  verifyToken,
  assignPermissionToRole
);

// ================= Get Permissions By Role =================
router.get(
  "/:roleId",
  verifyToken,
  getRolePermissions
);

export default router;