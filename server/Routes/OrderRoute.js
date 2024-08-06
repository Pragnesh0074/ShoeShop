const express = require('express');
const router = express.Router();
const {createOrder, getOrders, getOrderById, getAllUsersOrders} = require("../Controllers/OrderController");

router.post('/',createOrder);
router.get('/user/:userId',getOrders);
router.get('/:orderId',getOrderById);
router.get('/',getAllUsersOrders);

module.exports = router;