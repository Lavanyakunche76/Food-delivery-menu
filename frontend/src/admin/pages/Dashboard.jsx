import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = ({ url = "http://localhost:4000" }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    foods: 0,
    orders: 0,
    revenue: 0,
    users: 0, // 1. Initialize users count
  });

  /* ================= FETCH STATS ================= */
  const fetchStats = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      // 2. Added the User List API call here
      const [foodRes, orderRes, userRes] = await Promise.all([
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/order/list`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
        axios.get(`${url}/api/user/list`), // New API Call
      ]);

      setStats({
        foods: foodRes.data?.data?.length || 0,
        orders: orderRes.data?.data?.length || 0,

        // Fixed Revenue Calculation (from previous step)
        revenue:
          orderRes.data?.data?.reduce(
            (sum, order) => sum + (order.totalAmount || 0),
            0
          ) || 0,

        // 3. Set the real user count
        users: userRes.data?.data?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error("Failed to load dashboard stats");
    }
  };

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      toast.error("Admin login required");
      navigate("/admin/login");
      return;
    }
    fetchStats();
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="p-6 text-white space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">
            Monitor and manage your food delivery platform
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg font-semibold bg-red-500/80 hover:bg-red-600 transition shadow-md"
        >
          Logout
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Foods" value={stats.foods} color="blue" />
        <StatCard title="Total Orders" value={stats.orders} color="purple" />
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue}`}
          color="green"
        />

        {/* 4. Updated StatCard to show real user count */}
        <StatCard title="Total Users" value={stats.users} color="orange" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <ActionButton
            label="➕ Add Food"
            onClick={() => navigate("/admin/add")}
          />
          <ActionButton
            label="📋 Food List"
            onClick={() => navigate("/admin/list")}
          />
          <ActionButton
            label="📦 Orders"
            onClick={() => navigate("/admin/orders")}
          />
        </div>
      </div>
    </div>
  );
};

/* ================= SUB-COMPONENTS ================= */

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "from-blue-500 to-blue-700",
    purple: "from-purple-500 to-purple-700",
    green: "from-green-500 to-green-700",
    orange: "from-orange-500 to-orange-700",
  };

  return (
    <div
      className={`rounded-2xl p-5 bg-gradient-to-br ${colors[color]} shadow-lg`}
    >
      <p className="text-sm text-white/80">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
};

const ActionButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-purple-500/40 transition"
  >
    {label}
  </button>
);

export default Dashboard;
