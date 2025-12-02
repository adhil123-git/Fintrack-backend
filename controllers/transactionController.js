const Transaction = require("../model/transactionModel");
const Loan = require("../model/loanModel");  // 👈 REQUIRED IMPORT

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

    if (transactionType === "Principal amount") {
      loan.remainingBalance -= transactionAmount;
    } else if (transactionType === "Closing amount") {
      loan.remainingBalance = 0;
      loan.status = "closed";
    }

    await loan.save();

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
      data: transactions
    });

  } catch (error) {
    console.error("Fetch Transaction Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

