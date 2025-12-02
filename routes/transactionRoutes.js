const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");


router.post("/creation", transactionController.createTransaction);
router.get("/transactionList/:loanId", transactionController.getTransactionsByLoanId); 

module.exports = router;
