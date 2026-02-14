import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";

const Orders = ({ url = "http://localhost:4000" }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      toast.error("Admin login required");
      navigate("/admin/login");
      return;
    }
    fetchAllOrders();
  }, []);

  /* ================= FETCH ORDERS ================= */
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while fetching orders");
    }
  };

  /* ================= UPDATE STATUS ================= */
  /* ================= UPDATE STATUS ================= */
  const statusHandler = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${url}/api/order/status/${orderId}`,
        { status: status },
        {
          headers: {
            // ✅ FIX: Changed "token" to "adminToken" to match your login logic
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status Updated");
      } else {
        toast.error("Update Failed: " + response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="
              flex flex-col md:flex-row gap-4
              p-5 rounded-2xl
              bg-white/10 backdrop-blur-xl
              border border-white/20
              shadow-lg
            "
          >
            {/* Icon */}
            <img src={assets.parcel_icon} alt="parcel" className="w-12 h-12" />

            {/* Order Details */}
            <div className="flex-1 space-y-1">
              <p className="font-semibold">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p className="text-sm text-slate-300">
                {order.address.firstName} {order.address.lastName}
              </p>

              <p className="text-xs text-slate-400">
                {order.address.street}, {order.address.city},{" "}
                {order.address.state}, {order.address.country} -{" "}
                {order.address.zipcode}
              </p>

              <p className="text-xs text-slate-400">📞 {order.address.phone}</p>
            </div>

            {/* Meta */}
            <div className="flex flex-col items-end gap-2">
              <p className="text-sm">
                Items: <b>{order.items.length}</b>
              </p>
              <p className="font-bold text-lg">${order.amount}</p>

              <select
                value={order.status}
                onChange={(e) => statusHandler(order._id, e.target.value)}
                className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white focus:ring-2 focus:ring-blue-500"
              >
                {/* Add the initial status here so it matches what's in the DB */}
                <option value="Order Placed">Order Placed</option>

                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-slate-400 mt-10">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
