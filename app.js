const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./cron/paymentStatusCron");

const connectDB = require("./connection");

const app = express();

// Middleware
app.use(cors("*"));
app.use(express.json());

// Connect to MongoDB
connectDB();
app.use("/admin", require("./routes/adminRoutes"));
app.use("/customers", require("./routes/customerRoutes"));
app.use("/transaction", require("./routes/transactionRoutes"));
app.use("/loan", require("./routes/loanRoutes"));


// Basic Test Route
app.get("/", (req, res) => {
  res.send("Finance App Backend is Running...");
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
