import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="nav">
      <div className="nav__brand">
        <Link to={user?.role === "Retailer" ? "/retailer" : "/products"}>
          Inventory System
        </Link>
      </div>
      <nav className="nav__links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user?.role === "Retailer" && <Link to="/retailer">Retailer Dashboard</Link>}
        {user?.role === "Customer" && <Link to="/products">Products</Link>}
      </nav>
      <div className="nav__user">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button className="btn btn--ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span className="muted">Not signed in</span>
        )}
      </div>
    </header>
  );
}
