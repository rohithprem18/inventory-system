import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RetailerDashboard from "./pages/RetailerDashboard.jsx";
import CustomerView from "./pages/CustomerView.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { user, loading } = useAuth();

  const homeRedirect = () => {
    if (loading) return "/login";
    if (!user) return "/login";
    return user.role === "Retailer" ? "/retailer" : "/products";
  };

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={homeRedirect()} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute requiredRole="Retailer" />}>
          <Route path="/retailer" element={<RetailerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="Customer" />}>
          <Route path="/products" element={<CustomerView />} />
        </Route>

        <Route path="*" element={<Navigate to={homeRedirect()} replace />} />
      </Routes>
    </div>
  );
}
