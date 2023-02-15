const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "product",
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("cart", cartSchema)