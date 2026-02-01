import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.Oreo || req.headers.authorization?.split(" ")[1];
    if (!token) {
      const error = new Error("Not authorized, no token");
      error.statusCode = 401;
      return next(error);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const err = new Error("Not authorized, token failed");
    err.statusCode = 401;
    next(err);
  }
};

export const OtpProtect = async (req, res, next) => {
  try {
    const token = req.cookies.otpToken;
    console.log("Token recived in Cookies:", token);

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    if (!decode) {
      const error = new Error("Unauthorized! Please try again");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(decode.id);
    if (!verifiedUser) {
      const error = new Error("Unauthorized! Please try again");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};
