import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    address: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    /* ================= PAYMENT ================= */

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    stripeSessionId: {
      type: String,
    },

    /* ================= ORDER STATUS ================= */

    status: {
      type: String,
      default: "Payment Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
