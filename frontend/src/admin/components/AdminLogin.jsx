import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 1. Import this
import { Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 2. Initialize it

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/admin/auth/login",
        { email, password }
      );

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin"); // ✅ CORRECT
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("LOGIN ERROR 👉", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your beautiful UI code

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#030712] overflow-hidden font-sans">
      {/* Background Animated Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-bounce duration-[10s]" />

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-[420px] rounded-3xl
          bg-white/[0.03] backdrop-blur-2xl
          border border-white/10
          p-10
          shadow-[0_0_80px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)]"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            <ShieldCheck size={32} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Admin Portal
        </h1>
        <p className="text-center text-xs text-slate-400 mb-10 tracking-[0.2em] uppercase font-semibold">
          Secure Authorization
        </p>

        {/* Inputs */}
        <div className="space-y-5">
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
              size={20}
            />
            <input
              type="email"
              required
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            />
          </div>

          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors"
              size={20}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          disabled={loading}
          className="relative mt-8 group w-full overflow-hidden rounded-2xl p-[2px] focus:outline-none transition-all duration-300 active:scale-95 disabled:opacity-70"
        >
          <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3B82F6_0%,#8B5CF6_50%,#3B82F6_100%)]" />

          <div className="relative flex items-center justify-center gap-2 bg-slate-950 py-4 rounded-[14px] transition-all duration-300 group-hover:bg-transparent">
            {loading ? (
              <>
                <Loader2 className="animate-spin text-white" size={20} />
                <span className="text-white font-bold">VERIFYING...</span>
              </>
            ) : (
              <span className="text-white font-bold uppercase tracking-widest">
                Access System
              </span>
            )}
          </div>
        </button>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-center text-[10px] text-slate-500 font-mono tracking-widest">
            SYSTEM STATUS: OPERATIONAL
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
