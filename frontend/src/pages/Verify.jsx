import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });
      if (response.data.success) {
        navigate("/myorders");
        toast.success("Order Placed Successfully");
      } else {
        toast.error("Something went wrong");
        navigate("/");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error("Verification failed");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center relative overflow-hidden font-sans">
      {/* --- FLASHY ANIMATED BACKGROUND ELEMENTS --- */}
      {/* Pulsing Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      {/* Purple Accent */}
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      {/* --- MAIN VERIFICATION CARD --- */}
      <div className="relative z-10 flex flex-col items-center">
        {/* MODERN GLOSSY SPINNER */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer Ring */}
          <div className="w-24 h-24 border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>

          {/* Inner Reverse Ring */}
          <div className="absolute w-16 h-16 border-4 border-t-transparent border-r-cyan-400 border-b-transparent border-l-cyan-400 rounded-full animate-[spin_1.5s_linear_infinite_reverse] shadow-[0_0_15px_rgba(34,211,238,0.4)]"></div>

          {/* Center Core */}
          <div className="absolute w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]"></div>
        </div>

        {/* GLASS TEXT BOX */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
            Verifying Payment
          </h2>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-[0.3em] font-mono animate-pulse">
            Please do not refresh or close
          </p>
        </div>

        {/* FOOTER ACCENT */}
        <div className="mt-12 flex items-center gap-3 opacity-40">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
          <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">
            Secure Encryption
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
