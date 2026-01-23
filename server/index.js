import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser"; // 1. Import cookie-parser
import connectDB from "./src/config/db.js";

// Routes
import AuthRouter from "./src/routers/authRouter.js";
import publicRouter from "./src/routers/publicRouter.js";

const app = express();
const PORT = process.env.PORT || 4500;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser()); // 2. Use cookie-parser
app.use(morgan("dev"));

// API Routes
app.use("/auth", AuthRouter);
app.use("/public", publicRouter); // Renamed path to avoid conflict with /auth

// Health Check
app.get("/", (req, res) => {
  res.send("Server is Working Properly");
});

// Global Error Handler
app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ success: false, message });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`Server Started at Port: ${PORT}`);
  await connectDB();
});