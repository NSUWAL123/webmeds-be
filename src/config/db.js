const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(`Error is ${error.message}`);
    process.exit();
  }
};

module.exports = connectToMongo;
