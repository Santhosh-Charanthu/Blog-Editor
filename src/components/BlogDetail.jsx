import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/BlogDetail.css"; // import the CSS below

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/blogs/${id}`, {
          withCredentials: true,
        });
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="loading-text">Loading blog...</p>;

  return (
    <div className="blog-detail-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div className={`status ${blog.status}`}>
          {blog.status.toUpperCase()}
        </div>
        <span style={{ marginBottom: "10px", color: "#555" }}>
          <b>by {blog.user?.username || "Unknown"}</b>
        </span>
      </div>
      <h1 className="blog-title">{blog.title}</h1>
      <div className="blog-content">{blog.content}</div>
      <small className="blog-dates">
        Created: {new Date(blog.created_at).toLocaleString()} <br />
        Updated: {new Date(blog.updated_at).toLocaleString()}
      </small>
    </div>
  );
};

export default BlogDetail;
