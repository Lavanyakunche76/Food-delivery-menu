import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", protect, addToCart);
cartRouter.post("/remove", protect, removeFromCart);
cartRouter.post("/get", protect, getCart);

export default cartRouter;
