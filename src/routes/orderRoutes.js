const express = require("express");
const { getOrder, addOrder, deleteOrder } = require("../controllers/orderController");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.get('/getOrder', authUser, getOrder);
router.post('/addOrder', authUser, addOrder);
router.get('/deleteOrder', authUser, deleteOrder);



module.exports = router;