const User = require("../Models/UserModel");
const Admin = require("../Models/AdminModel")
const { createSecretToken } = require("../SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true });
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(201).json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(201).json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.AdminLogin = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(201).json({ message: "Incorrect password or email" });
    }
    if (password != admin.password) {
      return res.status(201).json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(admin._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ user: admin, message: "Admin logged in successfully", success: true});
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.Logout = async (req, res, next) => {
  res.clearCookie("token", {
    withCredentials: true,
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
  });
  res.status(200).json({ status: true, message: "Signed out successfully" });
};
