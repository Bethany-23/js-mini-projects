const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body; 

    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = new User({ email, password: hashedPassword }); 
    await user.save(); 

    res.json({ message: "User created successfully!" }); 
  } catch (err) {
    res.status(400).json({ error: "Signup failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body; 

  const user = await User.findOne({ email }); 
  if (!user) return res.status(400).json({ error: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password); 
  if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" }); 

  res.json({ token }); 
});

module.exports = router;
