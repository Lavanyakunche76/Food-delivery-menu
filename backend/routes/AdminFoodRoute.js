import express from "express";
import foodModel from "../models/foodModel.js";
import { protect, adminOnly } from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* =====================
   IMAGE UPLOAD CONFIG
===================== */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* =====================
   ADMIN: GET ALL FOODS
===================== */
router.get("/", protect, adminOnly, async (req, res) => {
  const foods = await foodModel.find();
  res.json(foods);
});

/* =====================
   ADMIN: ADD FOOD
===================== */
router.post(
  "/add",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    const food = await foodModel.create({
      name,
      description,
      price,
      category,
      image: req.file?.filename,
    });

    res.status(201).json(food);
  }
);

/* =====================
   ADMIN: UPDATE FOOD
===================== */
router.put("/:id", protect, adminOnly, async (req, res) => {
  const food = await foodModel.findById(req.params.id);
  if (!food) return res.status(404).json({ message: "Food not found" });

  Object.assign(food, req.body);
  await food.save();

  res.json(food);
});

/* =====================
   ADMIN: DELETE FOOD
===================== */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await foodModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Food deleted successfully" });
});

/* =====================
   ADMIN: UPDATE STATUS
===================== */
router.put("/status/:id", protect, adminOnly, async (req, res) => {
  try {
    // 1. Get the Order ID from the URL and Status from the body
    const { id } = req.params;
    const { status } = req.body;

    // 2. Find the order and update it
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order Status Updated",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
});

export default router;
