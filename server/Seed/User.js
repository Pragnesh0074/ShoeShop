const User = require("../Models/UserModel");

const users = [
  {
    _id: "66ae3d495eee429c56c86a4c",
    email: "demo@gmail.com",
    username: "demo",
    password: "$2a$12$cUNFzNgY2XoiZsy/FqQ/Qe.gznpAElagzTHBuu5luvyR2m7zgrp4y",
    __v: 0,
  },
];

exports.seedUser = async () => {
  try {
    await User.insertMany(users);
    console.log("Users seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
