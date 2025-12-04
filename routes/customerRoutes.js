const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");


router.post("/creation", customerController.createCustomer);
router.get("/list", customerController.getAllCustomers);
router.get("/due", customerController.getDueCustomers);


module.exports = router;
