import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./src/config/db.js";
import cloudinary from "./src/config/cloudinaryUpload.js";

import AuthRouter from "./src/routers/authRouter.js";
import publicRouter from "./src/routers/publicRouter.js";
import restaurantRouter from "./src/routers/restaurantRouter.js";
import orderRouter from "./src/routers/orderRoutes.js";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 4500;
const CLIENT_URLS = ["http://localhost:5173", "http://localhost:5174"];

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URLS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: Token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = {
      id: decoded._id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Socket Auth Error:", error.message);
    return next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(`Secure Connection: ${socket.id} (User: ${socket.user.id})`);

  socket.on("join_room", (room) => {
    if (socket.user.id === room) {
      socket.join(room);
      console.log(`Room Joined: ${room} by ${socket.user.role}`);
    } else {
      console.log(`Unauthorized Room Access attempt for: ${room}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔌 User Disconnected", socket.id);
  });
});

app.set("io", io);

app.use(
  cors({
    origin: CLIENT_URLS,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", AuthRouter);
app.use("/api/public", publicRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Savora Backend is Running...");
});

app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message });
});

httpServer.listen(PORT, async () => {
  console.log(`Server Started at Port: ${PORT}`);
  try {
    await connectDB();
    console.log("Database Connected Successfully");

    const res = await cloudinary.api.ping();
    console.log("Cloudinary API is Working");
  } catch (error) {
    console.error("Database/Cloudinary Connection Failed:", error);
  }
});

export { io };
