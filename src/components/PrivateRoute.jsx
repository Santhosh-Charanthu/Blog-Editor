import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/api/auth/me", { withCredentials: true });
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>;
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
