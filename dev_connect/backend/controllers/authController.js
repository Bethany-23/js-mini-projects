
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// signup controller
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create and save new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: "User created successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Signup failed!" });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    // create JWT token
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

    res.json({ message: "Login successful!", token });
  } catch (err) {
    res.status(400).json({ error: "Login failed!" });
  }
};

module.exports = { signup, login };
