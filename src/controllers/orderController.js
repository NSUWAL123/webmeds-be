const Order = require("../models/orderModal");
const User = require("../models/userModel");
const { sendMail } = require("../utils/email");

// 1. returns all the orders who's state is not delivered
const getAllOrders = async (req, res) => {
  const response = await Order.find();
  res.json(response);
};

const getOrder = async (req, res) => {
  const order = await Order.find({ userId: req.user.id });
  res.json({ order });
};

// INITIATES ORDER
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

  if (paymentType === "khalti") {
  }

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

  const { name, email } = await User.findById(userId);
  sendMail(
    email,
    "Order Placed Successfully",
    `<div>Hello ${name},</div>
  <div>Your order of order id <b>${response._id}</b> of has been successfully placed.</div>
  <div>Grand total: ${grandTotal}</div>
  <div>Total Items: ${totalItems}</div>
  <div>Billing Address: ${billingAddress}</div>
  <div>Thankyou,</div> 
  <div>Webmeds Nepal</div>
  `
  );

  res.json({
    data: response,
    message: "Order Successful",
  });
};

// UPDATE ORDER STATUS
const updateOrder = async (req, res) => {
  const { id, deliveryStatus } = req.body;

  const orderUpdate = await Order.findByIdAndUpdate(id, {
    deliveryStatus: deliveryStatus,
  });

  const { userId, grandTotal, totalItems, billingAddress } = orderUpdate;
  const { name, email } = await User.findById(userId);

  if (deliveryStatus === "ofd" || deliveryStatus === "delivered") {
    sendMail(
      email,
      `${
        deliveryStatus === "ofd"
          ? "Your order is on the way"
          : "Your order has been delivered"
      }`,
      `<div>Hello ${name},</div>
    <div>Your order of order id <b>${id}</b> ${
        deliveryStatus === "ofd" ? "is out for delivery" : "has been delivered."
      }.</div>
    <div>Grand total: ${grandTotal}</div>
    <div>Total Items: ${totalItems}</div>
    <div>Billing Address: ${billingAddress}</div>
    <div>Thankyou,</div> 
    <div>Webmeds Nepal</div>
    `
    );
  }

  res.json({
    message: "Order status changed.",
    data: orderUpdate,
  });
};

//DELETE ORDER (Cancel or Decline the Order)
const deleteOrder = async (req, res) => {
  const deleteOrd = await Order.findByIdAndUpdate(req.params.id, {
    failed: true,
  });

  res.json({
    message: "Order Declined",
    lvl: "success",
  });
};

module.exports = { getAllOrders, getOrder, addOrder, updateOrder, deleteOrder };
