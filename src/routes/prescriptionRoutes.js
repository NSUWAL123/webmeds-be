const express = require('express');
const { uploadPrescription } = require('../controllers/prescriptionController');
const authUser = require('../middlewares/authUser');
const router = express.Router();

router.post('/upload', authUser, uploadPrescription);

module.exports = router;