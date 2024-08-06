const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  stockQuantity: {
    type: Number,
    required: [true, "Stock quantity is required"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  }
});

module.exports = mongoose.model("Products", productSchema);