const customerService = require("../services/customerService");

exports.createCustomer = async (req, res) => {
  try {
    const { name, mobilenumber, address } = req.body;

    if (!name || !mobilenumber || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCustomer = await customerService.createCustomer(req.body);

    res.status(201).json({
      message: "Customer created successfully",
      data: newCustomer
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating customer",
      error: error.message
    });
  }
};
