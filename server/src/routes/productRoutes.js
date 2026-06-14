import express from "express";
import { body } from "express-validator";
import {
  createProduct,
  getProductBySlug,
  listProducts,
  updateProduct
} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

export const productRoutes = express.Router();

const productValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("slug").trim().notEmpty().withMessage("Slug is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price").isNumeric().withMessage("Price must be numeric"),
  body("category").isIn(["earrings", "bracelet", "necklace", "ring"]).withMessage("Invalid category"),
  body("audience").isIn(["women", "men", "unisex"]).withMessage("Invalid audience")
];

productRoutes.get("/", listProducts);
productRoutes.get("/:slug", getProductBySlug);
productRoutes.post("/", protect, adminOnly, productValidation, createProduct);
productRoutes.patch("/:id", protect, adminOnly, updateProduct);
