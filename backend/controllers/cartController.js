import userModel from "../models/userModel.js";

/* ================= ADD TO CART ================= */
const addToCart = async (req, res) => {
  try {
    // ✅ req.user is injected by protect middleware
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { itemId } = req.body;

    let cartData = user.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(user._id, { cartData });

    res.json({
      success: true,
      message: "Item added to cart",
      cartData,
    });
  } catch (error) {
    console.error("ADD_TO_CART_ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

/* ================= REMOVE FROM CART ================= */
const removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { itemId } = req.body;

    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(user._id, { cartData });

    res.json({
      success: true,
      message: "Item removed from cart",
      cartData,
    });
  } catch (error) {
    console.error("REMOVE_FROM_CART_ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error removing from cart",
    });
  }
};

/* ================= GET CART ================= */
const getCart = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    console.error("GET_CART_ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart data",
    });
  }
};

export { addToCart, removeFromCart, getCart };
