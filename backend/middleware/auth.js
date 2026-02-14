import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user; // ✅ SINGLE SOURCE OF TRUTH
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Admin access only" });
  }
};
