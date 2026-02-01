import express from "express";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  UpdateUserProfile,
  UserGenOTP,
  UserVerifyOtp,
  UserForgetPassword,
} from "../controllers/authController.js";
import { authUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { OtpProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);

router.post("/genOtp", UserGenOTP);
router.post("/verifyOtp", UserVerifyOtp);
router.post("/forgetPasword", OtpProtect, UserForgetPassword);

router.put(
  "/update-profile",
  authUser,
  upload.single("profilePic"),
  UpdateUserProfile,
);

export default router;
