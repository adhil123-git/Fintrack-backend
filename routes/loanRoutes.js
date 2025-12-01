const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.post("/create", loanController.createLoan);
router.get("/customer/:customerId", loanController.getLoansByCustomer);

module.exports = router;
