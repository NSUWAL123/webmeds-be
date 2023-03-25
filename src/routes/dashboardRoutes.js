const express = require("express");
const { getDetails } = require("../controllers/dashboardController");
const router = express.Router();
const authAdmin = require("../middlewares/authAdmin");

router.get('/details/:duration', authAdmin, getDetails)

module.exports = router;