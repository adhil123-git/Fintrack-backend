const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  loanId: {
    type: String,
    required: true,
    unique: true
  },

  customerId: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  interestPercentage: {
    type: Number,
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  paymentFrequency: {
    type: String,
    required: true
  },
  remainingBalance: {
    type: Number,
    required: true
  },
  // NEW FIELD
  status: {
    type: String,
    default: "new"   // 👈 automatically set
  }

}, { timestamps: true });

module.exports = mongoose.model("Loan", loanSchema);
