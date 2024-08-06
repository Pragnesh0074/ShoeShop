const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const productRoute = require("./Routes/ProductRoutes");
const cartRoute = require("./Routes/CartRoute");
const orderRoute = require("./Routes/OrderRoute");
const {connectToDB}=require("./connectDB")

connectToDB()
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.listen(4000, () => {});
app.use("/", authRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);