import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import publicRouter from "./src/routers/publicRouter.js";

const app = express();

app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/auth", publicRouter);

app.get("/", (req, res) => {
  res.send("Server is Working Properly");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`Server Started at Port: ${port}`);
  connectDB();
});
