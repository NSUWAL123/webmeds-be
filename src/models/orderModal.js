const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    orderTotal: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    orderLine: {
        type: Array,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('order', orderSchema)