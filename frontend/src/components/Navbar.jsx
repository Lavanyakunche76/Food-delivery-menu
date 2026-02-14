import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import {
  ShoppingBasket,
  User,
  LogOut,
  Package,
  ShieldCheck,
} from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <div
      className="sticky top-0 z-[100] w-full px-4 py-4 md:px-12
      flex justify-between items-center
      bg-[#030712]/90 backdrop-blur-xl
      border-b border-white/10 shadow-lg"
    >
      {/* LOGO */}
      <Link to="/" onClick={() => setMenu("home")}>
        <img
          src={assets.logo}
          alt="Logo"
          className="w-20 md:w-20 hover:scale-105 transition-transform drop-shadow-md"
        />
      </Link>

      {/* NAV LINKS */}
      <ul className="hidden md:flex gap-8 text-gray-300 font-medium capitalize">
        {["home", "menu", "contact-us"].map((item) => (
          <li key={item}>
            <a
              href={
                item === "home"
                  ? "/"
                  : `#${item === "menu" ? "explore-menu" : "footer"}`
              }
              onClick={() => setMenu(item)}
              className={`cursor-pointer hover:text-orange-500 transition-colors duration-200 ${
                menu === item
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : ""
              }`}
            >
              {item.replace("-", " ")}
            </a>
          </li>
        ))}
      </ul>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* CART */}
        <div className="relative group">
          <Link
            to="/cart"
            className="flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition"
          >
            <ShoppingBasket
              className="text-gray-200 group-hover:text-orange-500 transition-colors"
              size={26}
            />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div
              className="absolute top-0 right-0 w-3 h-3
              bg-red-500 border-2 border-[#030712] rounded-full"
            />
          )}
        </div>

        {/* ADMIN LOGIN BUTTON */}
        <button
          onClick={() => navigate("/admin/login")}
          className="hidden md:flex items-center gap-2
            px-4 py-2 rounded-full
            border border-blue-500/50 text-blue-400
            hover:bg-blue-600 hover:text-white hover:border-blue-600
            transition-all duration-300 font-medium"
        >
          <ShieldCheck size={18} />
          Admin
        </button>

        {/* USER AUTH */}
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 border border-orange-500
              text-orange-500 rounded-full font-medium
              hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            Sign In
          </button>
        ) : (
          <div className="relative">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 bg-gray-800 rounded-full border
                border-gray-600 cursor-pointer hover:border-orange-500 transition"
            >
              <User size={20} className="text-white" />
            </div>

            {/* PROFILE DROPDOWN */}
            {isProfileOpen && (
              <ul
                className="absolute right-0 mt-4 w-48
                bg-gray-900 border border-gray-700
                rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col"
              >
                <li
                  onClick={() => {
                    navigate("/myorders");
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3
                    text-gray-200 hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <Package size={18} className="text-orange-500" />
                  <span className="font-medium">Orders</span>
                </li>

                <div className="h-[1px] bg-gray-700 w-full"></div>

                <li
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3
                    text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors"
                >
                  <LogOut size={18} className="text-red-500" />
                  <span className="font-medium">Logout</span>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
