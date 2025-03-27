const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart routes
router.get('/', cartController.getAllCarts);
router.get('/:id', cartController.getCart);
router.get('/user/:userId', cartController.getCartByUser);

module.exports = router;
