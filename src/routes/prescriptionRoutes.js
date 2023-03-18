const express = require('express');
const { uploadPrescription, getAllPrescriptionOrders, updateStatus, getPrescriptionByUser, getPrescriptionById, initiateOrder } = require('../controllers/prescriptionController');
const authUser = require('../middlewares/authUser');
const router = express.Router();

router.post('/upload', authUser, uploadPrescription);
router.get('/getAllPrescriptionOrders', getAllPrescriptionOrders);
router.get('/getPrescriptionByUser', authUser, getPrescriptionByUser);
router.get('/getPrescriptionById/:id', getPrescriptionById)
router.put('/updateStatus', updateStatus);
router.put('/initiateOrder', authUser, initiateOrder);

module.exports = router;