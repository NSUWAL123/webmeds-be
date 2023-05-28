const Order = require("../models/orderModal");
const Prescription = require("../models/prescriptionModel");
const Product = require("../models/productModel");

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
    products: [],
    // topSelling: {}
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
  const failedOrdDeliveries = orders.filter(
    (fo) => fo.date.toJSON().slice(0, 7) === duration && fo.failed === true
  );
  const failedPresDeliveries = prescriptions.filter(
    (fo) => fo.date.toJSON().slice(0, 7) === duration && fo.failed === true
  );
  figures.failedDeliveries =
    failedOrdDeliveries.length + failedPresDeliveries.length;

  //TOTAL CUSTOMERS
  let customers = [];
  let ord = filteredOrders.map((fo) => customers.push(fo.userId.toString()));
  let pres = filteredPrescriptions.map((fo) =>
    customers.push(fo.userId.toString())
  );

  const uniqueCustomer = [...new Set(customers)];
  figures.totalCustomers = uniqueCustomer.length;

  //TOP SELLING PRODUCTS
  const orderlines = [];
  filteredOrders.map((ord) => {
    ord.orderLine.map(async (ordLine) => {
      orderlines.push({
        pid: ordLine.productId,
        pqty: ordLine.quantity,
      });
    });
  });

  const outputObj = orderlines.reduce((acc, curr) => {
    if (acc[curr.pid]) {
      acc[curr.pid] += curr.pqty;
    } else {
      acc[curr.pid] = curr.pqty;
    }
    return acc;
  }, {});

  const outputArray = Object.keys(outputObj).map((pid) => ({
    pid,
    pqty: outputObj[pid],
  }));

  figures.products = outputArray.sort((a, b) => b.pqty - a.pqty);
  res.json(figures);
};

module.exports = { getDetails };
