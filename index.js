const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const connectToMongo = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const productRoutes = require("./src/routes/productRoutes");
const noteRoutes = require("./src/routes/noteRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes")
const prescriptionRoutes = require("./src/routes/prescriptionRoutes")

const { notFoundHandler } = require("./src/middlewares/notFound");
const { errorHandler } = require("./src/middlewares/error");

//socket.io
// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// const io = new Server(server, {
//   //there are many problems related to cors in socket.io so we define cors
//   cors: {
//     origin: "http:/localhost:3000",
//     methods: ["GET", "POST"],
//   }
// })


app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb" }));

dotenv.config();
connectToMongo();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/notes", noteRoutes)
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)
app.use("/prescription", prescriptionRoutes)

// app.use("/chat", chatRoutes)


app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
