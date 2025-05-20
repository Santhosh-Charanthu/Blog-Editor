import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      showToast(res.data.message || "Registration successful!", "success");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/blog-editor");
      }, 2000);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Error registering user.",
        "error"
      );
    }
  };

  return (
    <div className="register-container">
      {toast && (
        <div
          className={`toast ${
            toastType === "error" ? "toast-error" : "toast-success"
          }`}
        >
          {toast}
        </div>
      )}

      <form className="register-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>
        <input
          className="input-field"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="input-field"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          type="email"
        />
        <input
          className="input-field"
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
        <p>
          Already Registered? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
