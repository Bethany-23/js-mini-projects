const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified; // attach user info to request
    next(); // continue to route
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
