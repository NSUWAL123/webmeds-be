const express = require("express");
const router = express.Router();
const {getAllProducts, getProductByName, medicine, baby, personalcare, getProductById} = require('../controllers/productsController')
const authUser = require('../middlewares/authUser')

router.get('/', getAllProducts)
router.get('/:pname', getProductByName)
router.get('/id/:id', getProductById)
router.get('/medicines', authUser, medicine);
router.get('/baby', authUser, baby);
router.get('/personalcare', personalcare);

module.exports = router;
