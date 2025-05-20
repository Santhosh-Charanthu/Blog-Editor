// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // 👈 This is essential to send cookies with requests
});

export default api;
