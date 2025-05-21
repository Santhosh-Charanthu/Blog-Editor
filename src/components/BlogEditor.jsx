import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ensure api has withCredentials: true
import "../styles/BlogEditor.css";

const BlogEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");

  const typingTimeoutRef = useRef(null);

  const showToast = (message, type = "success") => {
    toast.className = "toast"; // Reset classes
    toast.classList.add(`toast-${type}`); // Add type class
    toast.textContent = message;
    toast.style.display = "block"; // Show toast
    setTimeout(() => {
      toast.style.display = "none"; // Hide after 3s
      toast.textContent = ""; // Clear message
    }, 3000);
  };

  const handleAutoSave = async () => {
    if (!title.trim() && !content.trim()) return;

    try {
      await api.post(
        "/api/blogs/save-draft",
        {
          title: title.trim(),
          content: content.trim(),
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          status: "draft",
        },
        { withCredentials: true } // <== Add this here
      );
      showToast("Auto-saved draft!", "success");
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }
      const message = error.response?.data?.message || "Auto-save failed.";
      showToast(message, "error");
      console.error("Auto-save failed", error);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("Title and Content required to publish!", "error");
      return;
    }

    try {
      await api.post(
        "/api/blogs/publish",
        {
          title,
          content,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          status: "published",
        },
        { withCredentials: true } // <== And here
      );
      showToast("Blog published!", "success");
      setTitle("");
      setContent("");
      setTags("");
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }
      const message =
        error.response?.data?.message || "Failed to publish blog.";
      showToast(message, "error");
      console.error("Publish failed", error);
    }
  };

  const handleYourBlogs = (e) => {
    e.preventDefault();
    navigate("/your-blogs");
  };

  const handleAllBlogs = (e) => {
    e.preventDefault();
    navigate("/all-blogs"); // This matches your route
  };

  useEffect(() => {
    // Authentication check on component mount
    const checkAuth = async () => {
      try {
        await api.get("/api/auth/me", { withCredentials: true });
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 5000);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [title, content, tags]);

  return (
    <>
      {toast && (
        <div
          className={`toast ${
            toastType === "error" ? "toast-error" : "toast-success"
          }`}
        >
          {toast}
        </div>
      )}

      <div className="nav-buttons">
        <button onClick={handleAllBlogs}>All Blogs</button>
        <button onClick={handleYourBlogs}>Your Blogs</button>
      </div>

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
          <button className="publish-btn" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogEditor;
