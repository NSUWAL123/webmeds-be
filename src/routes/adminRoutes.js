const express = require("express");
const router = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductQty,
} = require("../controllers/manageProductController");
const authAdmin = require("../middlewares/authAdmin");

router.post("/manage-product/add", authAdmin, addProduct);
router.post("/manage-product/update/:id", authAdmin, updateProduct);
router.post("/manage-product/delete", authAdmin, deleteProduct);
router.post("/manage-product/updateQty", updateProductQty);

module.exports = router;
