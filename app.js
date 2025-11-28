const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./connection");

// Import Routes
const customerRoutes = require("./routes/customerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic Test Route
app.get("/", (req, res) => {
  res.send("Finance App Backend is Running...");
});

// Use Customer Routes
app.use("/customers", customerRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
