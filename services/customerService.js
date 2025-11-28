const Customer = require("../model/customerModel");

async function generateCustomerId() {
  const count = await Customer.countDocuments() + 1;
  return "CUST-" + String(count).padStart(3, "0");
}

exports.createCustomer = async (data) => {
  const customerId = await generateCustomerId();

  const customer = new Customer({
    customerId,
    name: data.name,
    mobilenumber: data.mobilenumber,
    address: data.address
  });

  await customer.save();
  return customer;
};
