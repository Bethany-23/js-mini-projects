
const express = require("express");
const router = express.Router();
const {authMiddleware, adminOnly} = require("../middleware/authMiddleware");
const {createPost, updatePost, getPosts, deletePost} = require("../controllers/postController")

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.put("/:id", authMiddleware, adminOnly, updatePost);
router.delete("/:id", authMiddleware, adminOnly, deletePost);

module.exports = router;