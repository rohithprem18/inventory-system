import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    const fallback = user.role === "Retailer" ? "/retailer" : "/products";
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
