const Prescription = require("../models/prescriptionModel");
const cloudinary = require("../utils/cloudinary");

const uploadPrescription = async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  const {
    prescriptionPicURL,
    doctorName,
    medicines,
    note,
    quotedPrice,
    billingAddress,
    paymentType,
    isPriceAccepted,
    deliveryStatus,
  } = req.body;

  console.log("thik cha");

  //cloudinary image upload
  const uploadResponse = await cloudinary.uploader.upload(prescriptionPicURL, {
    upload_preset: "prescription-pic",
  });

  console.log(uploadResponse);
  //extracting url from response
  const { url } = uploadResponse;
  const paymentStatus = false;
  const failed = false;

  try {
    const prescription = await Prescription.create({
      userId,
      prescriptionPicURL: url,
      doctorName,
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

module.exports = { uploadPrescription };
