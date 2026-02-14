import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// helper to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =====================
   REGISTER USER
===================== */
router.post("/register", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ FIXED
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FIXED
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

/* =====================
   LOGIN USER
===================== */
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // ✅ FIXED
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked by admin" });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

/* =====================
   GET PROFILE
===================== */
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

/* =====================
   ADMIN: GET ALL USERS
===================== */
router.get("/", protect, adminOnly, async (req, res) => {
  // ✅ FIXED
  const users = await userModel.find().select("-password");
  res.json(users);
});

/* =====================
   ADMIN: BLOCK / UNBLOCK
===================== */
router.put("/:id/block", protect, adminOnly, async (req, res) => {
  // ✅ FIXED
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
  });
});

router.get("/list", async (req, res) => {
  try {
    const users = await userModel.find({}); // Get all users
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

export default router;
