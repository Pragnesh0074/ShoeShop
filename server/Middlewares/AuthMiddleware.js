const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid token" });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user, message: "User verify successfully" });
      else return res.json({ status: false, message: "User not found" });
    }
  });
};
