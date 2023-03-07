const Prescription = require("../models/prescriptionModel");
const cloudinary = require("../utils/cloudinary");

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

    res.json({
      message: "Prescription Uploaded Successfully.",
      data: prescription,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPrescriptionOrders = async (req, res) => {
  const prescriptionOrder = await Prescription.find();
  res.json(prescriptionOrder);
};

const getPrescriptionById = async (id) => {
  const prescriptionOrder = await Prescription.findById(id);
  return prescriptionOrder;
};

const getPrescriptionByUser = async (req, res) => {
  const prescription = await Prescription.find({ userId: req.user.id });
  res.json(prescription);
};

const updateStatus = async (req, res) => {
  const prescription = await getPrescriptionById(req.body.id);
  const updatedPrescription = { ...prescription, ...req.body };

  const prescriptionOrder = await Prescription.findByIdAndUpdate(
    updatedPrescription._id,
    updatedPrescription
  );
  res.json(prescriptionOrder);
};

module.exports = {
  uploadPrescription,
  getAllPrescriptionOrders,
  updateStatus,
  getPrescriptionByUser,
};
