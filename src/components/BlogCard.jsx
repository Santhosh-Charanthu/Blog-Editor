import React from "react";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="blog-card">
      <div className={`status ${blog.status}`}>{blog.status.toUpperCase()}</div>
      <h2>{blog.title}</h2>
      <p>{blog.content?.slice(0, 150)}...</p>
      <small>
        Created: {new Date(blog.created_at).toLocaleString()} <br />
        Updated: {new Date(blog.updated_at).toLocaleString()}
      </small>
      {(onEdit || onDelete) && (
        <div className="card-actions">
          {onEdit && (
            <button onClick={() => onEdit(blog._id)} className="edit-btn">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(blog._id)} className="delete-btn">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
