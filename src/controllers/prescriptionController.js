const { findByIdAndUpdate } = require("../models/prescriptionModel");
const Prescription = require("../models/prescriptionModel");
const User = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");
const { sendMail } = require("../utils/email");

// UPLOAD PRESCRIPTION
const uploadPrescription = async (req, res) => {
  const userId = req.user.id;
  const {
    prescriptionPicURL,
    doctorName,
    doctorNMC,
    medicines,
    note,
    quotedPrice,
    billingAddress,
    paymentType,
    isPriceAccepted,
    deliveryStatus,
  } = req.body;

  //cloudinary image upload
  const uploadResponse = await cloudinary.uploader.upload(prescriptionPicURL, {
    upload_preset: "prescription-pic",
  });

  //extracting url from response
  const { url } = uploadResponse;
  const paymentStatus = false;
  const failed = false;

  try {
    const prescription = await Prescription.create({
      userId,
      prescriptionPicURL: url,
      doctorName,
      doctorNMC,
      medicines,
      note,
      quotedPrice,
      billingAddress,
      paymentType,
      isPriceAccepted,
      deliveryStatus,
      paymentStatus,
      failed,
    });

    const { name, email } = await User.findById(userId);

    sendMail(
      email,
      "Prescription order placed successfully",
      `<div>Hello ${name},</div>
    <div>Your prescrition order of order id <b>${prescription._id}</b> has been placed.</div>
    <div>Billing Address: ${billingAddress}</div>
    <div>Thankyou,</div> 
    <div>Webmeds Nepal</div>
    `
    );

    res.json({
      message: "Prescription Uploaded Successfully.",
      data: prescription,
    });
  } catch (error) {}
};

const getAllPrescriptionOrders = async (req, res) => {
  const prescriptionOrder = await Prescription.find();
  res.json(prescriptionOrder);
};

const getPrescriptionById = async (req, res) => {
  const prescriptionOrder = await Prescription.findById(req.params.id);
  res.json(prescriptionOrder);
};

const getPrescriptionByUser = async (req, res) => {
  const prescription = await Prescription.find({ userId: req.user.id });
  res.json(prescription);
};

const updateStatus = async (req, res) => {
  const updatedPrescription = req.body;

  const isPrescriptionQuoted = await Prescription.findById(
    updatedPrescription._id
  );
  const { name, email, _id } = await User.findById(isPrescriptionQuoted.userId);

  if (isPrescriptionQuoted.quotedPrice === 0) {
    sendMail(
      email,
      "Prescription Quotation",
      `<div>Hello ${name},</div>
    <div>The quoted price for your prescription order of order id <b>${_id}</b> is as follows.</div>
    <div>Grand total: ${updatedPrescription.quotedPrice}</div>
    <div>Billing Address: ${updatedPrescription.billingAddress}</div>
    <div>Thankyou,</div> 
    <div>Webmeds Nepal</div>
    `
    );
  }

  const prescriptionOrder = await Prescription.findByIdAndUpdate(
    updatedPrescription._id,
    updatedPrescription
  );

  console.log(prescriptionOrder);

  if (
    updatedPrescription.deliveryStatus === "ofd" ||
    updatedPrescription.deliveryStatus === "delivered"
  ) {
    sendMail(
      email,
      `${
        updatedPrescription.deliveryStatus === "ofd"
          ? "Your order is on the way"
          : "Your order has been delivered"
      }`,
      `<div>Hello ${name},</div>
    <div>Your prescription order of order id <b>${
      updatedPrescription._id
    }</b> ${
        updatedPrescription.deliveryStatus === "ofd"
          ? "is out for delivery"
          : "has been delivered."
      }.</div>
    <div>Grand total: ${updatedPrescription.quotedPrice}</div>
    <div>Billing Address: ${updatedPrescription.billingAddress}</div>
    <div>Thankyou,</div> 
    <div>Webmeds Nepal</div>
    `
    );
  }
  res.json(prescriptionOrder);
};

const initiateOrder = async (req, res) => {
  const order = req.body;
  const initiateOrder = await Prescription.findByIdAndUpdate(order._id, order);
  res.json(initiateOrder);
};

//DELETE PRESCRIPTION ORDER (Cancel or Decline the Order)
const deletePrescriptionOrder = async (req, res) => {
  console.log(req.params.id);
  const deleteOrd = await Prescription.findByIdAndUpdate(req.params.id, {
    failed: true,
  });

  res.json({
    message: "Order Declined",
    lvl: "success",
  });
};

module.exports = {
  uploadPrescription,
  getAllPrescriptionOrders,
  updateStatus,
  getPrescriptionByUser,
  getPrescriptionById,
  initiateOrder,
  deletePrescriptionOrder,
};
