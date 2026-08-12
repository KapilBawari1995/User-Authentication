import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";

import {
  assignPermissionToRole,
  getRolePermissions,
} from "../controllers/rolePermission.controller.js";

const router = express.Router();

router.put(
  "/:roleId",
  verifyToken,
  assignPermissionToRole
);

router.get(
  "/:roleId",
  verifyToken,
  getRolePermissions
);

export default router;