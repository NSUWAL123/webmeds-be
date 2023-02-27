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
  doctorNMC: {
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
    type: Number,
    required: true,
  },
  isPriceAccepted: {
    type: String,
    required: true,
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
    type: Boolean,
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
    required: true,
  },
});

module.exports = mongoose.model("prescription", prescriptionSchema);
