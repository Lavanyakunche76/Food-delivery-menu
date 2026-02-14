import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  ClipboardList,
} from "lucide-react";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        : "text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="w-72 min-h-screen bg-[#030712] border-r border-white/5 p-6 flex flex-col gap-4">
      <div className="mb-10 px-4">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-600">
          Admin Control
        </h2>
      </div>

      <NavLink to="/admin" end className={linkClass}>
        <LayoutDashboard size={20} /> <p className="font-semibold">Dashboard</p>
      </NavLink>
      <NavLink to="/admin/add" className={linkClass}>
        <PlusCircle size={20} /> <p className="font-semibold">Add Items</p>
      </NavLink>
      <NavLink to="/admin/list" className={linkClass}>
        <ListOrdered size={20} /> <p className="font-semibold">List Items</p>
      </NavLink>
      <NavLink to="/admin/orders" className={linkClass}>
        <ClipboardList size={20} /> <p className="font-semibold">Orders</p>
      </NavLink>

      <div className="mt-auto p-4 rounded-3xl bg-white/[0.02] border border-white/5">
        <p className="text-[10px] text-slate-500 font-mono text-center">
          SYSTEM OPERATIONAL v2.0
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
