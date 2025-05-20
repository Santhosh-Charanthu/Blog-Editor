import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [toast, setToast] = useState("");

  const typingTimeoutRef = useRef(null);

  // Create an axios instance that sends cookies for session-based auth
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // <-- This is critical to send cookies
  });

  useEffect(() => {
    // Fetch blog by ID on mount
    axiosInstance
      .get(`/api/blogs/${id}`)
      .then((res) => {
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setTags(blog.tags.join(", "));
      })
      .catch((err) => {
        console.error("Error fetching blog", err);
        showToast("Failed to load blog.");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [id]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleAutoSave = async () => {
    if (!title.trim() && !content.trim()) return;
    try {
      await axiosInstance.put(`/api/blogs/${id}`, {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: "draft",
      });
      showToast("Draft updated!");
    } catch (error) {
      console.error("Auto-save failed", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("Title and Content are required!");
      return;
    }
    try {
      await axiosInstance.put(`/api/blogs/${id}`, {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: "published",
      });
      showToast("Blog updated!");
      navigate("/your-blogs"); // Change to your route for listing blogs
    } catch (error) {
      console.error("Update failed", error);
      showToast("Failed to update blog.");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  // Auto-save on typing with debounce
  useEffect(() => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 5000);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [title, content, tags]); // Include tags for auto-save too

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/your-blogs"); // Update as needed
  };

  return (
    <>
      {toast && <div className="toast">{toast}</div>}
      <button onClick={handleClick}>All Blogs</button>
      <div className="editor-container">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your content here..."
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="button-group">
          <button className="save-btn" onClick={handleAutoSave}>
            Save as Draft
          </button>
          <button className="publish-btn" onClick={handleUpdate}>
            Update & Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
