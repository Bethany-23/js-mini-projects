const Like = require("../models/Like");

// 🩵 Add or toggle Like
const addLike = async (req, res) => {
  try {
    const { postId } = req.body;

    // Check if the user already liked the post
    const existingLike = await Like.findOne({
      post: postId,
      createdBy: req.user.id,
    });

    if (existingLike) {
      // If already liked, remove it (toggle unlike)
      await Like.findByIdAndDelete(existingLike._id);
      return res.json({ message: "Post unliked" });
    }

    // Otherwise, add a new like
    const newLike = new Like({
      post: postId,
      createdBy: req.user.id,
    });

    await newLike.save();
    res.json({ message: "Post liked", like: newLike });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like post" });
  }
};

module.exports = { addLike };
