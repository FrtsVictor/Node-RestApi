const express = require('express');

const router = express.Router();
const login = require('../middleware/login');

const OrdersController = require('../controller/orders');

router.get('/', OrdersController.getAll);
router.get('/:id', OrdersController.getById);
router.post('/', login.mandatory, OrdersController.create);
router.delete('/:id', login.mandatory, OrdersController.removeById);
router.put('/:id', login.mandatory, OrdersController.update);
module.exports = router;
