const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require("../Controllers/ProductController");

router.post("/", addProduct);
router.get("/", getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;