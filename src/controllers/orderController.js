const Order = require("../models/orderModal");

// 1. returns all the orders who's state is not delivered
const getAllOrders = async (req, res) => {
  const response = await Order.find();
  res.json(response)
}


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

module.exports = { getAllOrders, getOrder, addOrder, deleteOrder };
