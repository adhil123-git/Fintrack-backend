const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    unique: true
  },
  documentno: {         // <-- USER PROVIDED
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  mobilenumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    default: "new"
  },
  nextDueDate: {
    type: Date,
    default: null
  },
  lastPaidDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Customer", customerSchema);
