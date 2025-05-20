const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/blogController");
const ensureAuthenticated = require("../middleware/auth");
const Blog = require("../models/Blog");

router.post("/save-draft", ensureAuthenticated, controller.saveDraft);
router.post("/publish", ensureAuthenticated, controller.publishBlog);
router.get("/", controller.getBlogsWithFilter);

router.get(
  "/your-blogs",
  passport.authenticate("session"),
  controller.getUserBlogs
);
router.get("/:id", controller.getBlogById);
router.put("/:id", controller.editBlog);
router.delete("/:id", controller.destroyBlog);

module.exports = router;
