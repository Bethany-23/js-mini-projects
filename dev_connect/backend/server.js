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

// Connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
