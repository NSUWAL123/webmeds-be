const express = require("express");
const router = express.Router();
const {addProduct, updateProduct, deleteProduct} = require("../controllers/manageProductController")

router.post('/manage-product/add', addProduct)
router.post('/manage-product/update', updateProduct)
router.post('/manage-product/delete', deleteProduct)

module.exports = router;