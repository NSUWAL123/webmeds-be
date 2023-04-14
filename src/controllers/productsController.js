const Product = require("../models/productModel");

//returning all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({discontinued: false});
  res.json(products);
};

//finding product by name
const getProductByName = async (req, res) => {
  const product = await Product.findOne({ pname: req.params.pname });
  res.json(product);
};

//finding product by id
const getProductById = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.json(product);
};


// RETURN SEARCHED KEYWORD
const searchProductInDB = async (req, res) => {
  const keyword = req.params.keyword.toLocaleLowerCase();
  
  const product = await Product.find({discontinued: false});
  let filteredProduct = []

  for (let i = 0; i < product.length; i++) {
    if (product[i].pname.toLocaleLowerCase().includes(keyword) && keyword.length >= 3) {
      filteredProduct.push(product[i]);
    }
  }

  res.json(filteredProduct);
}

module.exports = {
  getAllProducts,
  getProductByName,
  getProductById,
  searchProductInDB,
};
