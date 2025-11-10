const Comment = require("../models/Comment");

// CREATE comment
exports.createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const comment = new Comment({
      text,
      post: postId,
      createdBy: req.user.id,
    });
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// READ comments for a post
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "createdBy",
      "email role"
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to get comments" });
  }
};

// DELETE comment (user can delete own, admin can delete all)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (req.user.role !== "admin" && comment.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
