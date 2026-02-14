import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

// Receive setShowLogin as a prop
const Cart = ({ setShowLogin }) => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const total = getTotalCartAmount();

    if (total === 0) {
      toast.error("Add some items to your cart first!");
      return;
    }

    if (!token) {
      toast.warning("Please login to place an order");
      // Trigger the login popup from App.jsx
      setShowLogin(true);
      return;
    }

    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* ... (Keep your existing UI design/JSX here) ... */}

      {/* Example of checkout button implementation: */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8">Cart Totals</h2>
        <div className="space-y-5 text-slate-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-white">${getTotalCartAmount()}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="text-white">
              ${getTotalCartAmount() === 0 ? 0 : 2}
            </span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between text-xl font-bold">
            <span className="text-slate-200">Total</span>
            <span className="text-orange-500">
              ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:shadow-orange-500/40 transition-all"
          >
            PROCEED TO CHECKOUT <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
