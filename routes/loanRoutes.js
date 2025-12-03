const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.post("/create", loanController.createLoan);
router.get("/:loanId", loanController.getLoanByLoanId);
router.get("/customer/:customerId", loanController.getLoansByCustomer);

module.exports = router;
