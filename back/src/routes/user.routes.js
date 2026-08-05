  import express from "express";
  import verifyToken from "../middlewares/authMiddleware.js";

  import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  } from "../controllers/user.controller.js";

  const router = express.Router();

  router.post("/", verifyToken, createUser);

  router.get("/", verifyToken, getAllUsers);

  router.get("/:id", verifyToken, getUserById);

  router.put("/:id", verifyToken, updateUser);

  router.delete("/:id", verifyToken, deleteUser);

  export default router;