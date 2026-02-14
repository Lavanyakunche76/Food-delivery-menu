import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Mail, Lock, User as UserIcon } from "lucide-react";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const endpoint =
      currentState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(url + endpoint, data);

      // ✅ SUCCESS
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message || "Login Successful");
      setShowLogin(false);
    } catch (err) {
      // ✅ SHOW REAL BACKEND ERROR
      const msg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm p-4">
      <form
        onSubmit={onLogin}
        className="relative w-full max-w-[400px] bg-[#030712]/90 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-zoom-in overflow-hidden"
      >
        {/* Glow Background */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-orange-600/20 rounded-full blur-[60px]" />

        <div className="flex justify-between items-center mb-8 relative">
          <h2 className="text-3xl font-bold text-white">{currentState}</h2>
          <X
            className="text-slate-400 cursor-pointer hover:text-white transition-colors"
            size={24}
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="space-y-4 relative">
          {currentState !== "Login" && (
            <div className="relative group">
              <UserIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors"
                size={20}
              />
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
                className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
          )}
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors"
              size={20}
            />
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
              className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors"
              size={20}
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Password"
              required
              className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-2xl hover:from-orange-500 hover:to-red-500 shadow-lg shadow-orange-600/30 active:scale-95 transition-all uppercase tracking-widest"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-start gap-3 mt-6">
          <input type="checkbox" required className="mt-1 accent-orange-500" />
          <p className="text-slate-500 text-xs">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {currentState === "Login" ? (
          <p className="text-center text-slate-400 mt-6 text-sm">
            New here?{" "}
            <span
              className="text-orange-500 font-bold cursor-pointer hover:underline"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create account
            </span>
          </p>
        ) : (
          <p className="text-center text-slate-400 mt-6 text-sm">
            Already have an account?{" "}
            <span
              className="text-orange-500 font-bold cursor-pointer hover:underline"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
