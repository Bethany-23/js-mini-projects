const express = require("express");
const router = express.Router();
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");
const {
  createPost,
  updatePost,
  getPosts,
  deletePost,
} = require("../controllers/postController");

// Create post — must be logged in (user or admin)
router.post("/", authMiddleware, createPost);

// Get all posts — anyone logged in can view
router.get("/", authMiddleware, getPosts);

// Update post — user can update their own, admin can update any
router.put("/:id", authMiddleware, updatePost);

// Delete post — user can delete their own, admin can delete any
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
