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
  res.json(prescriptionOrder)

}

module.exports = { uploadPrescription, getAllPrescriptionOrders };
