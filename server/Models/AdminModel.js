const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
});

module.exports = mongoose.model("Admins", adminSchema);