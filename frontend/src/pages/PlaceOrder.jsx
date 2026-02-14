import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { token, url, getTotalCartAmount, setCartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (getTotalCartAmount() === 0) {
      toast.error("Cart is empty");
      return;
    }

    // 🔥 IMPORTANT FIX
    const backendPaymentMethod =
      paymentMethod === "UPI" ? "ONLINE" : paymentMethod;

    try {
      const res = await axios.post(
        `${url}/api/order/create`,
        {
          address: data,
          paymentMethod: backendPaymentMethod,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setCartItems({});
        toast.success(
          paymentMethod === "COD"
            ? "Order placed successfully"
            : "Order placed. Payment will be verified manually."
        );
        navigate("/myorders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all";

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <form
        onSubmit={placeOrder}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12"
      >
        {/* LEFT */}
        <div className="w-full lg:w-3/5 space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Delivery Information
          </h2>

          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="Last Name"
          />
          <input
            required
            name="email"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="Email"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="Street"
          />
          <input
            required
            name="city"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="State"
          />
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="Country"
          />
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            className={inputClasses}
            placeholder="Phone"
          />
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-2/5 bg-white/5 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>

          <label className="flex items-center gap-3 text-slate-300">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-3 text-slate-300 mt-3">
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI (Google Pay / PhonePe / Paytm)
          </label>

          {paymentMethod === "UPI" && (
            <div className="mt-4 p-4 bg-white/10 rounded-xl text-center">
              <p className="text-slate-300 mb-2">Pay using UPI</p>
              <img src="/upi-qr.png" alt="UPI QR" className="mx-auto w-40" />
              <p className="text-white mt-2 font-semibold">UPI ID: Demo@SBI</p>
              <p className="text-xs text-slate-400 mt-1">
                After payment, click "Proceed"
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-xl font-bold"
          >
            {paymentMethod === "COD" ? "PLACE ORDER" : "I HAVE PAID"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
