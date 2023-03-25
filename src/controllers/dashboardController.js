const Order = require("../models/orderModal");
const Prescription = require("../models/prescriptionModel");

const getDetails = async (req, res) => {
  const duration = req.params.duration;
  let figures = {
    orderTotal: 0, //done
    prescriptionTotal: 0, //done
    productSales: 0,
    ordersFulfilled: 0,
    prescriptionsFulfilled: 0,
    failedDeliveries: 0,
    totalCustomers: 0,
  };

  //ORDER REVENUE
  const orders = await Order.find();
  const filteredOrders = orders.filter(
    (order) =>
      order.date.toJSON().slice(0, 7) === duration &&
      order.deliveryStatus === "delivered"
  );
  figures.orderTotal = filteredOrders.reduce(
    (total, order) => total + order.grandTotal,
    0
  );

  //PRESCRIPTION ORDER REVENUE
  const prescriptions = await Prescription.find();
  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.date.toJSON().slice(0, 7) === duration &&
      prescription.deliveryStatus === "delivered"
  );
  figures.prescriptionTotal = filteredPrescriptions.reduce(
    (total, prescription) => total + prescription.quotedPrice,
    0
  );

  //ORDERS FULFILLED
  figures.ordersFulfilled = filteredOrders.length;

  //PRESCRIPTIONS FULFILLED
  figures.prescriptionsFulfilled = filteredPrescriptions.length;

  //PRODUCT SALES
  figures.productSales = filteredOrders.reduce(
    (total, order) => total + order.totalItems,
    0
  );

  //FAILED DELIVERIES
  const failedDeliveries = filteredOrders.filter(
    (fo) => fo.deliveryStatus === "failed"
  );
  figures.failedDeliveries = failedDeliveries.length;

  //TOTAL CUSTOMERS
  let customers = [];
  let ord = filteredOrders.map((fo) => customers.push(fo.userId.toString()));
  let pres = filteredPrescriptions.map((fo) => customers.push(fo.userId.toString()));

  const uniqueCustomer = [...new Set(customers)]
  figures.totalCustomers = uniqueCustomer.length;
  // console.log(customers)
  // console.log(uniqueCustomer.length);

  console.log(figures);
  res.json(figures);
};

module.exports = { getDetails };
