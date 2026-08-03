import { Router } from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct, 
} from "../controllers/product.controller.js";

const router = Router();

router.post("/products", getProducts);

router.post("/products/add", addProduct);

router.get("/products/:id", getProductById);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;