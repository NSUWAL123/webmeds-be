const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectToMongo = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const categoriesRoutes = require("./src/routes/categoryRoutes")
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
app.use("/categories", categoriesRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
