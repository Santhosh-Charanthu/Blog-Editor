const Blog = require("../models/Blog");
const mongoose = require("mongoose");

exports.saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  const user = req.user; // Passport sets authenticated user here

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  try {
    let blog;

    if (id) {
      // Update existing draft only if user owns it
      blog = await Blog.findOneAndUpdate(
        { _id: id, user: user._id }, // secure update by ownership
        {
          title,
          content,
          tags,
          status: "draft",
          updated_at: Date.now(),
        },
        { new: true }
      );

      if (!blog) {
        return res
          .status(404)
          .json({ message: "Draft not found or unauthorized" });
      }
    } else {
      // Create new draft for this user
      blog = await Blog.create({
        title,
        content,
        tags,
        status: "draft",
        user: user._id,
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Save draft error:", error);
    res.status(500).json({ message: "Failed to save draft." });
  }
};

exports.publishBlog = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      status: "published",
      user: user._id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Publish blog error:", error);
    res.status(500).json({ message: "Failed to publish blog." });
  }
};

exports.getBlogsWithFilter = async (req, res) => {
  try {
    const filter = req.query.filter;

    if (!req.user && filter === "your-blogs") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (filter === "your-blogs") {
      const blogs = await Blog.find({ user: req.user._id }).sort({
        updatedAt: -1,
      });
      return res.json(blogs);
    } else if (filter === "all-blogs") {
      const blogs = await Blog.find({ status: "published" }).sort({
        updatedAt: -1,
      });
      return res.json(blogs);
    } else {
      return res.status(400).json({ message: "Invalid filter" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get blogs owned by logged-in user (including drafts)
exports.getUserBlogs = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const blogs = await Blog.find({ user: user._id }).sort({ updated_at: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user blogs." });
  }
};

// Edit blog by ID (make sure user owns the blog)
exports.editBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  try {
    // Only update if the blog belongs to the authenticated user
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id, user: user._id },
      updateData,
      { new: true }
    );

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found or you are not authorized." });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Edit blog error:", error);
    res.status(500).json({ message: "Server error while updating blog." });
  }
};

exports.destroyBlog = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  try {
    // Delete only if blog belongs to the user
    const deletedBlog = await Blog.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found or you are not authorized." });
    }

    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Server error while deleting blog." });
  }
};
