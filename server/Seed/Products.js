const Product = require("../Models/ProductModel");

const products = [
  {
    _id: "66af242249ee13b2816928a9",
    name: "Nike Air 1",
    description: "Best Running Shoes",
    price: 5500,
    stockQuantity: 10,
    thumbnail: "uploads\\1722754082743.png",
    __v: 0,
  },
  {
    _id: "66b0d273ab2a7fb2425e4836",
    name: "Spark Mens Shoes",
    description: "Most Comfortable Shoe",
    price: 1200,
    stockQuantity: 10,
    thumbnail: "uploads\\1722864243788.png",
    __v: 0,
  },
  {
    _id: "66b0d5abab2a7fb2425e485c",
    name: "Campus North Plus",
    description: "Best Sneaker Shoe",
    price: 5500,
    stockQuantity: 10,
    thumbnail: "uploads\\1722865067880.png",
    __v: 0,
  },
];

exports.seedProduct = async () => {
  try {
    await Product.insertMany(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
