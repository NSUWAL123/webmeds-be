const express = require("express");
const router = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductQty,
} = require("../controllers/manageProductController");

router.post("/manage-product/add", addProduct);
router.post("/manage-product/update/:id", updateProduct);
router.post("/manage-product/delete", deleteProduct);
router.post("/manage-product/updateQty", updateProductQty);

module.exports = router;
