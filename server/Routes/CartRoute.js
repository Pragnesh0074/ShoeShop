const router = require("express").Router();
const {addToCart, deleteFromCart, getCart} =  require("../Controllers/CartController");

router.post('/', addToCart);
router.delete('/:userId/remove/:productId', deleteFromCart);
router.get('/:userId', getCart);

module.exports = router;