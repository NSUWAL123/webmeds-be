const Product = require("../models/productModel");

const getCategory = async (req, res) => {
    const products = await Product.find({category: req.params.type});
    res.json(products);
}

module.exports = {getCategory};