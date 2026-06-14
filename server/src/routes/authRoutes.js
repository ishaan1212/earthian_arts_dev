import express from "express";
import { body } from "express-validator";
import { getMe, login, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

export const authRoutes = express.Router();

authRoutes.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  ],
  register
);

authRoutes.post("/login", login);
authRoutes.get("/me", protect, getMe);
