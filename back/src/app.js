import express from "express";
import cors from "cors";

import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/authRoutes.js";
import roleRouter from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import permissionRouter from "./routes/permission.routes.js";
import rolePermissionRoutes from "./routes/rolePermission.routes.js";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is Running...",
  });
});

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/permissions", permissionRouter);
app.use("/api/v1", taskRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use(
  "/api/v1/notifications", notificationRoutes
);
// Role Permission Routes
app.use("/api/v1/role-permission", rolePermissionRoutes);

export default app;