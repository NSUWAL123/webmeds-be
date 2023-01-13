const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectToMongo = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes")
const { notFoundHandler } = require("./src/middlewares/notFound");
const { errorHandler } = require("./src/middlewares/error");

app.use(cors());
app.use(express.json());
dotenv.config();
connectToMongo();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/user", userRoutes);
app.use("/products", productRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
