const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  pname: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPct: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  productPicURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", productSchema);
