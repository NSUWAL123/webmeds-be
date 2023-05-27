const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  pharmacistId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  messages: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("chat", chatSchema);
