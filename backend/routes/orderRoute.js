import express from "express";
import Order from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import { protect, adminOnly } from "../middleware/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

/* =====================
   CREATE ORDER (ONLINE PAYMENT - STRIPE)
===================== */
router.post("/place", protect, placeOrder);

/* =====================
   CREATE ORDER (COD / UPI MANUAL)
===================== */
router.post("/create", protect, async (req, res) => {
  try {
    let { address, paymentMethod } = req.body;

    // ✅ Default payment method
    paymentMethod = paymentMethod || "COD";

    // 🔒 Address validation
    if (!address || typeof address !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }

    // 🔹 Get user
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {};

    // 🔒 Cart empty check
    if (Object.keys(cartData).length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // 🔹 Fetch food items
    const foodIds = Object.keys(cartData);
    const foods = await foodModel.find({ _id: { $in: foodIds } });

    if (!foods.length) {
      return res.status(400).json({
        success: false,
        message: "Food items not found",
      });
    }

    // 🔹 Build order items
    const orderItems = foods.map((food) => ({
      food: food._id,
      name: food.name,
      image: food.image,
      price: food.price,
      quantity: cartData[food._id.toString()] || 1,
    }));

    // 🔹 Calculate total
    const totalAmount =
      orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2;

    // 🔹 Create order
    const order = await Order.create({
      user: user._id,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PAID" : "PENDING",
      status:
        paymentMethod === "COD"
          ? "Food Processing"
          : "Payment Verification Pending",
    });

    // 🔹 Clear cart AFTER order creation
    user.cartData = {};
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error("ORDER CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
});

/* =====================
   USER: MY ORDERS
===================== */
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("MY ORDERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

/* =====================
   ADMIN: ALL ORDERS
===================== */
router.get("/list", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("ADMIN ORDER LIST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

/* =====================
   ADMIN: UPDATE STATUS
===================== */
router.put("/status/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
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
