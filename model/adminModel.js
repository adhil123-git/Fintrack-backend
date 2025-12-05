const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light"
  },
  language: {
    type: String,
    enum: ["en", "ta"],
    default: "en"
  }

}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
