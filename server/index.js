import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";

import AuthRouter from "./src/routers/authRouter.js";
import publicRouter from "./src/routers/publicRouter.js";
import restaurantRouter from "./src/routers/restaurantRouter.js";


const app = express();
const PORT = process.env.PORT || 4500;

app.use(cors({ 
  origin: "http://localhost:5173", 
  credentials: true 
}));

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", publicRouter);
app.use("/restaurant", restaurantRouter);
app.get("/", (req, res) => {
  res.send("Server is Working Properly");
});

app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ success: false, message });
});

app.listen(PORT, async () => {
  console.log(`Server Started at Port: ${PORT}`);
  try {
    await connectDB();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
  }
});