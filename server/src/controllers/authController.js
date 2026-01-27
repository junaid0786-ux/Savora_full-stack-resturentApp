import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/authToken.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, password, role } = req.body;

    if (!fullName || !email || !mobileNumber || !password || !role) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashPassword,
      role,
    });

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 401;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    genToken(existingUser, res);

    res.status(200).json({
      message: "Login Successful",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};

export const UserLogout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    next(error);
  }
};

export const UpdateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const file = req.file;

    const { fullName, mobileNumber, address, email, dob, gender, city, pin } = req.body;

    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (mobileNumber) updateData.mobileNumber = mobileNumber;
    if (address) updateData.address = address;
    if (email) updateData.email = email;
    if (dob) updateData.dob = dob;
    if (gender) updateData.gender = gender;
    if (city) updateData.city = city;
    if (pin) updateData.pin = pin;

    if (file) {
      const result = await uploadToCloudinary(file.buffer);

      updateData.photo = {
        url: result.secure_url,
        publicID: result.public_id,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
