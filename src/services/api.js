// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://draftnest.onrender.com",
  withCredentials: true, // 👈 This is essential to send cookies with requests
});

export default api;
