const cron = require("node-cron");
const Customer = require("../model/customerModel");

// Runs every day at 12:01 AM
cron.schedule("1 0 * * *", async () => {
  console.log("Running payment status cron...");

  const today = new Date();
  const todayString = today.toDateString();

  // Fetch all customers with scheduled due dates
  const customers = await Customer.find({
    nextDueDate: { $ne: null }
  });

  for (const c of customers) {
    const dueDate = new Date(c.nextDueDate);
    const lastPaid = c.lastPaidDate ? new Date(c.lastPaidDate) : null;

    let newStatus = c.paymentStatus;

    // ⭐ CASE 1 — TODAY IS EXACT DUE DATE & NO PAYMENT → DUE
    if (todayString === dueDate.toDateString()) {
      if (!lastPaid || lastPaid < dueDate) {
        newStatus = "due";
      }
    }

    // ⭐ CASE 2 — TODAY AFTER DUE DATE & STILL NO PAYMENT → OVERDUE
    if (today > dueDate) {
      if (!lastPaid || lastPaid < dueDate) {
        newStatus = "overdue";
      }
    }

    // Only update if status changes
    if (newStatus !== c.paymentStatus) {
      await Customer.updateOne(
        { customerId: c.customerId },
        { paymentStatus: newStatus }
      );
      console.log(`Updated ${c.customerId} → ${newStatus}`);
    }
  }
});
