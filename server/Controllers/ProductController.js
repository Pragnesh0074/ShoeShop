const Product = require("../Models/ProductModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

module.exports.addProduct = [
  upload.single('thumbnail'),
  async (req, res, next) => {
    try {
      const { name, description, price, stockQuantity } = req.body;
      const thumbnail = req.file ? req.file.path : null;

      const product = await Product.create({ 
        name, 
        description, 
        price, 
        stockQuantity, 
        thumbnail 
      });

      res
        .status(201)
        .json({ message: "Product added successfully", success: true, product });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
];

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    const productsWithId = products.map(product => ({
      ...product,
      thumbnailUrl: product.thumbnail ? `http://localhost:4000/${product.thumbnail}` : null
    }));
    res.status(200).json({ success: true, products: productsWithId });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stockQuantity, thumbnail } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stockQuantity, thumbnail },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ message: "Product updated successfully", success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};