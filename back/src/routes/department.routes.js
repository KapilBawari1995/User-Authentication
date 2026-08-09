import express from "express";

import {
  createDepartment,
  getDepartments,

  getDepartmentManagers,
  assignDepartmentManager,

} from "../controllers/department.controller.js";

import verifyToken from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post(
  "/",
  verifyToken,
  createDepartment
);

router.get("/", 
    verifyToken,
    getDepartments);


router.get(
  "/:departmentId/managers",
  verifyToken,
  getDepartmentManagers
);

// ================= ASSIGN DEPARTMENT MANAGER =================

router.put(
  "/:departmentId/assign-manager",
  verifyToken,
  assignDepartmentManager
);




export default router;