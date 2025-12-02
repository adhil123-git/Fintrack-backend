const mongoose = require("mongoose");
const createDefaultAdmin = require("./utils/createAdmin");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.time("MongoDB Connection Time");

    await mongoose.connect(process.env.MONGODB_URI, { dbName: "fintrack-db" });

    console.timeEnd("MongoDB Connection Time");

    await createDefaultAdmin();
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
