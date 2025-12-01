const Admin = require("../model/adminModel");

async function createDefaultAdmin() {
  try {
    const exists = await Admin.findOne({ username: "adhil" });
    
    if (exists) {
      console.log("✔ Admin already exists");
      return;
    }

    await Admin.create({
      username: "adhil",
      password: "adhil1234",
      theme: "light"
    });

    console.log("✔ Default admin created");

  } catch (err) {
    console.error("❌ Failed to create admin:", err.message);
  }
}

module.exports = createDefaultAdmin;
