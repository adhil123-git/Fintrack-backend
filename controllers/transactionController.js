const Transaction = require("../model/transactionModel");
const Loan = require("../model/loanModel");  // 👈 REQUIRED IMPORT
const Customer = require("../model/customerModel");

exports.createTransaction = async (req, res) => {
  try {
    const { loanId, transactionType, transactionAmount, transactionDate } = req.body;

    const loan = await Loan.findOne({ loanId });  // now this will work
    if (!loan) {
      return res.status(404).json({
        status: "error",
        message: "Loan not found"
      });
    }

    const tx = new Transaction({
      loanId,
      transactionType,
      transactionAmount,
      transactionDate
    });

    await tx.save();

    // PRINCIPAL PAYMENT LOGIC
    if (transactionType === "Principal amount") {
      loan.remainingBalance -= transactionAmount;
    }
    // AUTO-CLOSE LOGIC (applies to BOTH types)
    if (loan.remainingBalance <= 0) {
      loan.remainingBalance = 0;
      loan.status = "closed";
      loan.closingDate = new Date();
    }


    await loan.save();
    // ⭐ PAYMENT STATUS ENGINE
    const customer = await Customer.findOne({ customerId: loan.customerId });

    const today = new Date();
    const dueDate = new Date(customer.nextDueDate);
    const lastPaid = customer.lastPaidDate ? new Date(customer.lastPaidDate) : null;

    let newStatus = customer.paymentStatus;

    /*
    ===========================================================
     CASE 1 — PAYMENT IS DONE (Interest or EMI)
    ===========================================================
    */
    if (transactionType === "Interest amount") {

      // ⭐ ANY PAYMENT (BEFORE, ON, or AFTER due date) → PAID
      newStatus = "paid";

      // ⭐ NEXT DUE DATE = SAME DATE NEXT MONTH
      const nextDue = new Date(dueDate);
      nextDue.setMonth(nextDue.getMonth() + 1);

      await Customer.updateOne(
        { customerId: loan.customerId },
        {
          paymentStatus: newStatus,
          lastPaidDate: today,
          nextDueDate: nextDue
        }
      );
    }


    /*
    ===========================================================
     CASE 2 — NO PAYMENT (check date only)
    ===========================================================
    */
    else {

      // 2A. TODAY IS EXACT DUE DATE & NO PAYMENT → DUE
      if (today.toDateString() === dueDate.toDateString()) {
        if (!lastPaid || lastPaid < dueDate) {
          newStatus = "due";
        }
      }

      // 2B. TODAY AFTER DUE DATE & NO PAYMENT → OVERDUE
      if (today > dueDate) {
        if (!lastPaid || lastPaid < dueDate) {
          newStatus = "overdue";
        }
      }

      await Customer.updateOne(
        { customerId: loan.customerId },
        { paymentStatus: newStatus }
      );
    }


    return res.status(200).json({
      status: "success",
      message: "Transaction created successfully",
      data: tx
    });

  } catch (error) {
    console.error("Transaction Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.getTransactionsByLoanId = async (req, res) => {
  try {
    const { loanId } = req.params;

    const transactions = await Transaction.find({ loanId })
      .sort({ transactionDate: -1 }); // latest first

    return res.status(200).json({
      status: "success",
      transactions: transactions
    });

  } catch (error) {
    console.error("Fetch Transaction Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

