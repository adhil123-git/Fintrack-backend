const Customer = require("../model/customerModel");

async function generateCustomerId() {
  const count = await Customer.countDocuments() + 1;
  return "CUST-" + String(count).padStart(3, "0");
}

exports.createCustomer = async (data) => {
  const { name, mobilenumber, documentno } = data;

  // ✔ Check only when BOTH name & mobile match
  const existingCustomer = await Customer.findOne({
    name: name,
    mobilenumber: mobilenumber
  });

  if (existingCustomer) {
    throw new Error("Customer already exists with the same name and mobile number");
  }

  const customerId = await generateCustomerId();

  const customer = new Customer({
    customerId,
    documentno,
    name,
    mobilenumber,
    address: data.address
  });

  await customer.save();
  return customer;
};

exports.getAllCustomers = async () => {
  const customers = await Customer.find().sort({ createdAt: -1 });  // newest first
  return customers;
};
