import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items to order",
      });
    }

    if (!process.env.FRONTEND_URL) {
      return res.status(500).json({
        success: false,
        message: "FRONTEND_URL not configured",
      });
    }

    // 1️⃣ CREATE ORDER WITH PENDING PAYMENT
    const order = await orderModel.create({
      user: userId,
      items,
      address,
      totalAmount: amount + 2,
      paymentMethod: "ONLINE",
      paymentStatus: "PENDING",
      status: "Payment Pending",
    });

    // 2️⃣ CREATE STRIPE LINE ITEMS
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd", // change to "inr" if you switch gateway
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // 3️⃣ CREATE STRIPE SESSION
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },
    });

    // 4️⃣ SAVE STRIPE SESSION ID (IMPORTANT)
    order.stripeSessionId = session.id;
    await order.save();

    res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("STRIPE PLACE ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate payment",
    });
  }
};
