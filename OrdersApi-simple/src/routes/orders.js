const express = require('express');

const router = express.Router();

const OrdersController = require('../controller/orders');

router.get('/', OrdersController.getOrders);
router.get('/:id', OrdersController.getOrdersById);
router.post('/', OrdersController.createOrder);
router.delete('/:id', OrdersController.removeById);

module.exports = router;
