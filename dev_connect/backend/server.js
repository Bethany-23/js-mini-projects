const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
dotenv.config(); // load .env variables

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ debug: true }); // Enable debug mode
console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log
// Connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
