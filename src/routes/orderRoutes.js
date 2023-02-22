const express = require("express");
const { getOrder, addOrder, deleteOrder, getAllOrders } = require("../controllers/orderController");
const authUser = require("../middlewares/authUser");
const router = express.Router();

//admin
router.get('/getAllOrders', getAllOrders)

router.get('/getOrder', authUser, getOrder);
router.post('/addOrder', authUser, addOrder);
router.get('/deleteOrder', authUser, deleteOrder);



module.exports = router;