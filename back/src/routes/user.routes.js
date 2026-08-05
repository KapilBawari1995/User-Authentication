  import express from "express";
  import verifyToken from "../middlewares/authMiddleware.js";

  import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
      getProfile,

  } from "../controllers/user.controller.js";

  const router = express.Router();

  router.post("/", verifyToken, createUser);

  router.get("/", verifyToken, getAllUsers);

  router.get("/:id", verifyToken, getUserById);

  router.put("/:id", verifyToken, updateUser);

  router.delete("/:id", verifyToken, deleteUser);
  router.get("/profile/me", verifyToken,  getProfile);

  export default router;