const express = require('express');
const { uploadPrescription, getAllPrescriptionOrders } = require('../controllers/prescriptionController');
const authUser = require('../middlewares/authUser');
const router = express.Router();

router.post('/upload', authUser, uploadPrescription);
router.get('/getAllPrescriptionOrders', getAllPrescriptionOrders);

module.exports = router;