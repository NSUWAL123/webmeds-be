const express = require("express");
const { getDeal } = require("../controllers/dealController");
const router = express.Router();

router.get('/:deal', getDeal)

module.exports = router;