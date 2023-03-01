const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductByName,
  medicine,
  baby,
  personalcare,
  getProductById,
  searchProductInDB,
} = require("../controllers/productsController");
const authUser = require("../middlewares/authUser");

router.get("/", getAllProducts);
router.get("/:pname", getProductByName);
router.get("/id/:id", getProductById);

router.get("/search/:keyword", searchProductInDB)

module.exports = router;
