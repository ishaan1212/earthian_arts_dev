import express from "express";
import { getOrder, listAllOrders, listMyOrders } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

export const orderRoutes = express.Router();

orderRoutes.get("/mine", protect, listMyOrders);
orderRoutes.get("/", protect, adminOnly, listAllOrders);
orderRoutes.get("/:id", protect, getOrder);
