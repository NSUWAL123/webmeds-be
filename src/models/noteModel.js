const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true
      }
})

module.exports = mongoose.model("note", noteSchema);