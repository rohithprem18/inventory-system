import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Retailer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await registerUser({ name, email, password, role });
      login(user);
      navigate(role === "Retailer" ? "/retailer" : "/products");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth">
      <form className="card form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="alert alert--error">{error}</div>}
        <label>
          Full Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Retailer">Retailer</option>
            <option value="Customer">Customer</option>
          </select>
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="muted">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
