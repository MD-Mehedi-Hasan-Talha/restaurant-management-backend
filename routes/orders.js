const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Order routes
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrder);
router.get('/user/:userId', orderController.getOrdersByUser);
router.get('/status/:status', orderController.getOrdersByStatus);

module.exports = router;
