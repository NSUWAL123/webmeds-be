const express = require("express");
const { getCart, addCart, editCart, removeCart, removeAllCart, toggleCheck } = require("../controllers/cartController");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.get('/getCartItems', authUser, getCart);
router.post('/addCart', authUser, addCart);
router.post('/editCart', authUser, editCart);
router.post('/toggleCheck', authUser, toggleCheck);
router.delete('/removeCart/:id',  removeCart);
router.delete('/removeAllCart', authUser, removeAllCart);

module.exports = router;



