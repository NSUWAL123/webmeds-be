const express = require("express");
const {
  uploadPrescription,
  getAllPrescriptionOrders,
  updateStatus,
  getPrescriptionByUser,
  getPrescriptionById,
  initiateOrder,
  deletePrescriptionOrder,
} = require("../controllers/prescriptionController");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.post("/upload", authUser, uploadPrescription);
router.get("/getAllPrescriptionOrders", getAllPrescriptionOrders);
router.get("/getPrescriptionByUser", authUser, getPrescriptionByUser);
router.get("/getPrescriptionById/:id", getPrescriptionById);
router.put("/updateStatus", updateStatus);
router.post("/initiateOrder", authUser, initiateOrder);
router.put("/deletePrescriptionOrder/:id", deletePrescriptionOrder);

module.exports = router;
