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

export const genOtpToken = (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    console.log(token);

    res.cookie("otpToken", token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  } catch (error) {
    throw error;
  }
};
