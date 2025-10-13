const express = require("express");
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// register user
router.post("/signup", signup);

// login user
router.post("/login", login);

// example protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!` });
});

module.exports = router;
