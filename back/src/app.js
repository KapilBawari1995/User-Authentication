import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/authRoutes.js";

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

app.use("/api/v1", productRouter);
app.use("/api/v1/auth", authRouter);

export default app;