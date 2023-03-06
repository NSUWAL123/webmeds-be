const express = require("express");
const { initiatePayment } = require("../controllers/paymentController");
const router = express.Router();

router.post('/initiatePayment', initiatePayment)

module.exports = router;
