
const express = require("express");
const router = express.Router();
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.get("/user", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to the user dashboard, ${req.user.id}` });
});

router.get("/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({ message: `Welcome to the admin dashboard, ${req.user.id}` });
});

module.exports = router;
