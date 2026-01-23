import express from "express";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  UpdateUserProfile,
} from "../controllers/authController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);
router.put("/update-profile", authUser, UpdateUserProfile);

export default router;