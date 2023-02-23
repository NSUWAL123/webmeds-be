const mongoose = require("mongoose");
const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  prescriptionPicURL: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  medicines: {
    type: Array,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  quotedPrice: {
    type: String,
    required: true,
  },
  isPriceAccepted: {
    type: Boolean,
    default: false,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  failed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("prescription", prescriptionSchema);
