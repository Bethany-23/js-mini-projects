const express = require("express");
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// register user
router.post("/signup", signup);

// login user
router.post("/login", login);



module.exports = router;
