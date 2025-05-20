import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import "../styles/BlogCard.css";

const BlogList = ({ filter }) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  const fetchBlogs = () => {
    axios
      .get("/api/blogs", {
        params: { filter }, // send filter param here
        withCredentials: true,
      })
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          console.error(err);
        }
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios.delete(`/api/blogs/${id}`).then(() => {
        fetchBlogs();
      });
    }
  };

  const drafts = blogs.filter((b) => b.status === "draft");
  const published = blogs.filter((b) => b.status === "published");

  return (
    <div>
      <h3>Published Blogs</h3>
      <div className="blog-grid">
        {published.length === 0 && <p>No published blogs found.</p>}
        {published.map((b) => (
          <BlogCard
            key={b._id}
            blog={b}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <h3>Drafts</h3>
      <div className="blog-grid">
        {drafts.length === 0 && <p>No drafts found.</p>}
        {drafts.map((b) => (
          <BlogCard
            key={b._id}
            blog={b}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
