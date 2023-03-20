const express = require("express");
const { getOrder, addOrder, deleteOrder, getAllOrders, updateOrder } = require("../controllers/orderController");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");
const router = express.Router();

//admin
router.get('/getAllOrders', getAllOrders)
router.put('/updateOrder', authAdmin, updateOrder);

router.get('/getOrder', authUser, getOrder);
router.post('/addOrder', authUser, addOrder);
router.get('/deleteOrder', authUser, deleteOrder);



module.exports = router;