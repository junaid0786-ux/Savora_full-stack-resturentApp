import express from "express";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  UpdateUserProfile,
} from "../controllers/authController.js";
import { authUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);
router.post()

router.put("/update-profile",authUser,upload.single("profilePic"), UpdateUserProfile
);

export default router;
