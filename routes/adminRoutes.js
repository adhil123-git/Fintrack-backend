const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.post("/theme", adminController.updateTheme);
router.get("/theme/:userId", adminController.getTheme);


module.exports = router;
