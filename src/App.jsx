import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogEditor from "./components/BlogEditor";
import BlogList from "./components/BlogList";
import EditBlog from "./components/EditBlog";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import AllBlogs from "./components/AllBlogs";
import BlogDetail from "./components/BlogDetail";
import axios from "axios";

const App = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <div className="container">
      <h1>📝 Blog Platform</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/your-blogs" element={<BlogList filter="your-blogs" />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route
          path="/blog-editor"
          element={
            <PrivateRoute>
              <BlogEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
