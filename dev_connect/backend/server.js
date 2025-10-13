const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// allow JSON data in requests
app.use(express.json());
app.use(cors());

// connect to MongoDB (replace with your connection string)
mongoose.connect("mongodb://localhost:27017/authApp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// use authentication routes
app.use("/api/auth", authRoutes);

// start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
