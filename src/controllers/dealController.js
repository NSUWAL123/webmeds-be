const Product = require("../models/productModel");

const getDeal = async (req, res) => {
    const dealType = req.params.deal;

    if (dealType === 'hot-deals') {
        const product = await Product.find();
        const hotProducts = product.filter((product) => product.discountPct > 70);
        res.json(hotProducts);
    }
}

module.exports = {getDeal}