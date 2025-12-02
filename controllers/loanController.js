const Loan = require("../model/loanModel");
const Customer = require("../model/customerModel");

async function generateLoanId() {
  const count = await Loan.countDocuments() + 1;
  return "LOAN-" + String(count).padStart(3, "0");
}


exports.createLoan = async (req, res) => {
  try {
    const { customerId, amount, interestPercentage, startDate, paymentFrequency } = req.body;

    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found"
      });
    }

    const loanId = await generateLoanId();

    const loan = new Loan({
      loanId,
      customerId,
      amount,
      interestPercentage,
      startDate,
      paymentFrequency,
      remainingBalance: amount ,
      status: "new"   // 👈 add status on creation
    });

    await loan.save();

    return res.status(200).json({
      status: "success",
      message: "Loan created successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};


exports.getLoansByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const loans = await Loan.find({ customerId });

    return res.status(200).json({
      status: "success",
      loans
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};
