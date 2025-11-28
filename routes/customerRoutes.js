const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// CREATE CUSTOMER (POST) - /customers/creation
router.post("/creation", customerController.createCustomer);

module.exports = router;
