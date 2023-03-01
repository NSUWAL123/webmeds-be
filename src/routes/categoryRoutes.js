const express = require("express");
const { getCategory } = require("../controllers/categoryController");
const router = express.Router();

router.get("/:type", getCategory);

module.exports = router;
