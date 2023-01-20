const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

const addProduct = async (req, res) => {

  //extracting all data from input fields
  const {
    pname,
    purpose,
    type,
    category,
    company,
    price,
    discountPct,
    offerPrice,
    stock,
    expiry,
    previewSource,
    description,
  } = req.body;

  try {
    //not allowing to add product to inventory if product name already exists
    const isProductInDB = await Product.findOne({ pname });
    if (isProductInDB) {
      res.json({
        message: "Product already exists.",
        lvl: "warning",
      });
      return;
    }

    //cloudinary image upload
    const uploadResponse = await cloudinary.uploader.upload(previewSource, {
      upload_preset: "product-pic",
    });

    //extracting url from response
    const { url } = uploadResponse;

    let product = Product.create({
      pname: pname,
      purpose: purpose,
      type: type,
      category: category,
      company: company,
      price: price,
      discountPct: discountPct,
      offerPrice: offerPrice,
      stock: stock,
      expiry: expiry,
      productPicURL: url,
      description: description,
    });

    res.json({
      message: "Product added successfully",
      lvl: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {

  //extracting all data from input fields
  const {
    pname,
    purpose,
    type,
    category,
    company,
    price,
    discountPct,
    offerPrice,
    stock,
    expiry,
    previewSource, //picture cannot be updated
    description,
  } = req.body;

  try {
    //finding product by id and updating
    const isProductInDB = await Product.findByIdAndUpdate(req.params.id, {
      pname: pname,
      purpose: purpose,
      type: type,
      category: category,
      company: company,
      price: price,
      discountPct: discountPct,
      offerPrice: offerPrice,
      stock: stock,
      expiry: expiry,
      description: description,
    });

    res.json({
      message: "Product updated successfully",
      lvl: "success",
    });

  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  
  //extracting id from body then searching & deleting from db
  const { id } = req.body;
  const product = await Product.findByIdAndDelete(id);

  res.json({
    message: "Product Deleted successfully",
    lvl: "success",
  });
};

module.exports = { addProduct, updateProduct, deleteProduct };
