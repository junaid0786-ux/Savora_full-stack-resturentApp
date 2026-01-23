import jwt from "jsonwebtoken";

export const genToken = (user, res) => {
  try {
    const payload = {
      _id: user._id,
      role: user.role || "admin",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("Oreo", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    console.log("Oreo cookie set:", token);
  } catch (error) {
    throw error;
  }
};
