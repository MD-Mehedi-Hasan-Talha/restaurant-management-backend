const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');

// PaymentMethod routes
router.get('/', paymentMethodController.getAllPaymentMethods);
router.get('/:id', paymentMethodController.getPaymentMethod);

module.exports = router;
