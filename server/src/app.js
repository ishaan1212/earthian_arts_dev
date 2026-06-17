import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { checkoutRoutes } from "./routes/checkoutRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { stripeWebhook } from "./controllers/webhookController.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

export const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhook);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "earthian-arts-api",
    message: "API is running. Open the frontend at the client URL.",
    frontendUrl: allowedOrigins[0],
    healthUrl: "/api/health"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "earthian-arts-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", checkoutRoutes);

app.use(notFound);
app.use(errorHandler);
