const Order = require("../models/orderModal");

const getOrder = async (req, res) => {
 
};

const addOrder = async (req, res) => {
  const userId = req.user.id;
  const {
    orderTotal,
    totalItems,
    discount,
    deliveryCharge,
    grandTotal,
    orderLine,
    billingAddress,
    paymentType,
    paymentStatus,
    deliveryStatus,
  } = req.body;

  console.log( userId, orderTotal)

  const response = await Order.create({
    userId,
    orderTotal,
    totalItems,
    discount,
    deliveryCharge,
    grandTotal,
    orderLine,
    billingAddress,
    paymentType,
    paymentStatus,
    deliveryStatus,
  });

  res.json({
    data: response,
    message: "Order Successful"
  })
};

const deleteOrder = async (req, res) => {};

module.exports = { getOrder, addOrder, deleteOrder };
