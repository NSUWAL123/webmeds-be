const express = require("express");
const { getCart, addCart, editCart, removeCart, removeAllCart } = require("../controllers/cartController");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.get('/getCartItems', authUser, getCart);
router.post('/addCart', authUser, addCart);
router.post('/editCart', authUser, editCart);
router.delete('/removeCart',  removeCart);
router.delete('/removeAllCart', authUser, removeAllCart);

module.exports = router;



