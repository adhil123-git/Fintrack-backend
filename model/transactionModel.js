const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  loanId: {
    type: String,
    required: true
  },

  transactionType: {
    type: String,
    required: true
  },

  transactionAmount: {
    type: Number,
    required: true
  },

  transactionDate: {         
    type: Date,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
