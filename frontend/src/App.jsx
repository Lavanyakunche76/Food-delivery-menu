import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* --- COMPONENTS (src/components) --- */
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginPopup from "./components/LoginPopup.jsx";

/* --- USER PAGES (src/pages) --- */
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Verify from "./pages/Verify.jsx";
import MyOrders from "./pages/MyOrders.jsx";

/* --- ADMIN (src/admin) --- */
import AdminLogin from "./admin/components/AdminLogin.jsx";
import ProtectedRoute from "./admin/components/ProtectedRoute.jsx";
import AdminLayout from "./admin/components/Layout.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import Add from "./admin/pages/Add.jsx";
import List from "./admin/pages/List.jsx";
import Orders from "./admin/pages/Orders.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-[#030712] min-h-screen">
      <ToastContainer
        theme="dark"
        position="bottom-right"
        toastStyle={{
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "1.25rem",
        }}
      />

      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        USER ROUTES
        <Route
          path="/"
          element={
            <>
              <Navbar setShowLogin={setShowLogin} />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar setShowLogin={setShowLogin} />
              <Cart setShowLogin={setShowLogin} />
              <Footer />
            </>
          }
        />
        <Route
          path="/order"
          element={
            <>
              <Navbar setShowLogin={setShowLogin} />
              <PlaceOrder />
              <Footer />
            </>
          }
        />
        <Route
          path="/verify"
          element={
            <>
              <Navbar setShowLogin={setShowLogin} />
              <Verify />
              <Footer />
            </>
          }
        />
        <Route
          path="/myorders"
          element={
            <>
              <Navbar setShowLogin={setShowLogin} />
              <MyOrders />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
