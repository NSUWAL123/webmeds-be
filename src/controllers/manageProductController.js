const Product = require("../models/productModel");
//const cloudinary = require("cloudinary").v2
const cloudinary = require("../utils/cloudinary")

const addProduct = async (req, res) => {
  //res.send("Add Products")
  console.log("endpoint hit hanyo")
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
    const isProductInDB = await Product.findOne({ pname }); 
    if (isProductInDB) {
      //res.send("Product Already Exists.");
      res.json({
        message: "Product already exists.",
        lvl: "warning"
      })
      return;
    }

    //cloudinary image upload
    console.log("uploading image")
    const uploadResponse = await cloudinary.uploader.upload(previewSource,{
      upload_preset: 'product-pic'
    });

    console.log("uploaded")

    const {url} = uploadResponse

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
      lvl: "success"
    })
    
  } catch (error) {
    console.log(error)
  }  
};

const updateProduct = (req, res) => {
  res.send("Update Products");
};

const deleteProduct = (req, res) => {
  res.send("Delete Products");
};

module.exports = { addProduct, updateProduct, deleteProduct };
