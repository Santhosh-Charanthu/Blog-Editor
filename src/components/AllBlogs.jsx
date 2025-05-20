import React, { useEffect, useState } from "react";
import axios from "../services/api";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllPublishedBlogs();
  }, []);

  const fetchAllPublishedBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs", {
        params: { filter: "all-blogs" },
        withCredentials: true,
      });
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch all published blogs:", error);
    }
  };

  return (
    <div>
      <h3>All Published Blogs</h3>
      {blogs.length === 0 && <p>No published blogs found.</p>}
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} onEdit={null} onDelete={null} />
      ))}
    </div>
  );
};

export default AllBlogs;
