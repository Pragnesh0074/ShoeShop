const Admin = require("../Models/AdminModel");

const admin = [
  {
    _id: "669e6328ecac9b0dcc1167c2",
    username: "admin",
    password: "admin",
  },
];

exports.seedAdmin = async () => {
  try {
    await Admin.insertMany(admin);
    console.log("Admins seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
