import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const navigate = useNavigate();

  const showToast = (message, type = "error") => {
    setToastType(type);
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        showToast("Login successful!", "success");
        navigate("/blog-editor");
      } else {
        showToast("Login failed. Try again.", "error");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      showToast(message, "error");
    }
  };

  return (
    <>
      {toast && (
        <div
          role="alert"
          className={`toast ${
            toastType === "error" ? "toast-error" : "toast-success"
          }`}
        >
          {toast}
        </div>
      )}

      <div className="register-container">
        <form className="register-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p>
            Not Registered yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
