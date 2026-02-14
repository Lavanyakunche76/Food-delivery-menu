import React, { useContext, useEffect, useState } from "react";
// import "./MyOrders.css"; // Removed custom CSS in favor of Tailwind
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(`${url}/api/order/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) setOrders(res.data.data);
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    // Outer container with dark background and subtle gradient
    <div className="min-h-[60vh] bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black">
      {/* Fancy gradient text title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        My Orders
      </h2>

      {/* Container for the list of orders */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {orders.map((order) => (
          // Individual Order Card - Glassmorphism and Glow effects
          <div
            key={order._id}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-5 rounded-2xl 
                       bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl
                       transition-all duration-300 ease-in-out
                       hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-1"
          >
            {/* Decorative glowing border effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

            {/* Icon container with inner glow */}
            <div className="flex-shrink-0 p-3 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-[inset_0_0_10px_rgba(56,189,248,0.1)]">
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-6 h-6 opacity-80 invert-[.8]"
              />
            </div>

            {/* Items List String */}
            <p className="text-slate-300 text-sm sm:text-base font-medium flex-1 leading-relaxed break-words">
              {order.items.map((i) => `${i.name} x ${i.quantity}`).join(", ")}
            </p>

            {/* Amount */}
            <p className="text-cyan-400 font-bold text-lg sm:text-xl tracking-tight min-w-[80px] text-right">
              ${order.amount}
            </p>

            {/* Total Items Count */}
            <p className="text-slate-400 text-sm font-medium min-w-[70px] text-center sm:text-right bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
              Items: {order.items.length}
            </p>

            {/* Status Section with glowing dot */}
            <p className="text-slate-200 text-sm font-semibold tracking-wider uppercase flex items-center gap-2 min-w-[110px] justify-end">
              {/* The glowing dot span */}
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></span>
              <b className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                {order.status}
              </b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
