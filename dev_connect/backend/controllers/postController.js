const Post = require("../models/Post");

// CREATE post
exports.createPost = async(req, res) =>{
  try{
    const {title, content} = req.body;
    const post = new Post({title, createdBy: req.user.id, content});
    await post.save();
    res.json(post);
  }catch(err){
    res.status(500).json({error: "Failed to create a post!"})
  }
}

// READ all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "email role");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// UPDATE post (admin only)
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// DELETE post (admin only)
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
