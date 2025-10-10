
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Connect to MongoDB
//mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydb")
  //.then(() => console.log("✅ MongoDB connected"))
  //.catch(err => console.error(err));

// Use auth routes
app.use("/api", authRoutes); 

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
