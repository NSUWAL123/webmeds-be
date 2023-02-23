
const Prescription = require("../models/prescriptionModel");
const cloudinary = require("../utils/cloudinary");

const uploadPrescription = async (req, res) => {
    const {userId} = req.user.id;
    const {prescriptionPicURL, doctorName, medicines, note, billingAddress , paymentType, paymentStatus , deliveryStatus} = req.body;

    const prescription = await Prescription.create({
        userId,
        prescriptionPicURL,
        doctorName,
        medicines,
        note,
        billingAddress,
        paymentType,
        paymentStatus,
        deliveryStatus
        //more to come
    })
}

module.exports = {uploadPrescription}