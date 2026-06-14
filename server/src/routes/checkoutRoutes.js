import express from "express";
import { createCheckoutSession } from "../controllers/checkoutController.js";
import { protect } from "../middleware/authMiddleware.js";

export const checkoutRoutes = express.Router();

checkoutRoutes.post("/session", protect, createCheckoutSession);
