const express = require("express");
const router = express.Router();
const {getAllProducts, getProductByName, medicine, baby, personalcare} = require('../controllers/productsController')
const authUser = require('../middlewares/authUser')

router.get('/', getAllProducts)
router.get('/:pname', getProductByName)
router.get('/medicines', authUser, medicine);
router.get('/baby', authUser, baby);
router.get('/personalcare', personalcare);

module.exports = router;
