const Product = require('../models/productModel')

const getAllProducts = async (req, res) => {
    //res.send("All products");
    const products = await Product.find();
    res.json(products);
}

const getProductByName = async (req, res) => {
    const product = await Product.findOne({pname: req.params.pname})

    res.json(product)
}

const getProductById = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id})
    res.json(product)
}

const medicine = (req, res) => {
    res.send("In medicines");
}

const baby = (req, res) => {
    res.send("In baby");
}

const personalcare = (req, res) => {
    res.send("In personalcare");
}

module.exports = {getAllProducts, medicine, baby, personalcare, getProductByName, getProductById};
