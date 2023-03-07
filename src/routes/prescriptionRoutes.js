const express = require('express');
const { uploadPrescription, getAllPrescriptionOrders, updateStatus, getPrescriptionByUser } = require('../controllers/prescriptionController');
const authUser = require('../middlewares/authUser');
const router = express.Router();

router.post('/upload', authUser, uploadPrescription);
router.get('/getAllPrescriptionOrders', getAllPrescriptionOrders);
router.get('/getPrescriptionByUser', authUser, getPrescriptionByUser);
router.put('/updateStatus', updateStatus);

module.exports = router;