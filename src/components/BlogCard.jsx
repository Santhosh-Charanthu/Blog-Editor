import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <div
      className="blog-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
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

      <h2>{blog.title}</h2>
      <p>{blog.content?.slice(0, 150)}...</p>
      <small>
        Created: {new Date(blog.created_at).toLocaleString()} <br />
        Updated: {new Date(blog.updated_at).toLocaleString()}
      </small>
      {(onEdit || onDelete) && (
        <div className="card-actions">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(blog._id);
              }}
              className="edit-btn"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(blog._id);
              }}
              className="delete-btn"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
