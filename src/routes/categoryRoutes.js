const express = require("express");
const router = express.Router();
const {medicine, baby, personalcare} = require('../controllers/categoryController')
const authUser = require('../middlewares/authUser')

router.get('/medicines', authUser, medicine);
router.get('/baby', authUser, baby);
router.get('/personalcare', personalcare);

module.exports = router;
