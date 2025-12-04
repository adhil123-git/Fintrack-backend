const customerService = require("../services/customerService.js");

exports.createCustomer = async (req, res) => {
  try {
    const { name, mobilenumber, address, documentno } = req.body;

    // Validate required fields
    if (!name || !mobilenumber || !address) {
      return res.status(400).json({ 
        message: "All fields (name, mobilenumber, address, documentno) are required" 
      });
    }

    // Call service
    const newCustomer = await customerService.createCustomer(req.body);

    // Success response
    return res.status(200).json({
      message: "Customer created successfully",
      status:"success"
    });

  } catch (error) {
    // Error response
    return res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();

    return res.status(200).json({
      status: "success",
      message: "Customers fetched successfully",
      data: customers
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch customers",
      error: error.message
    });
  }
};

exports.getDueCustomers = async (req, res) => {
  try {
   const dueCustomers = await customerService.getCustomersByStatus("due");

    return res.status(200).json({
      status: "success",
      message: "Due customers fetched successfully",
      data: dueCustomers
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

