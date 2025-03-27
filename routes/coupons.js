const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

// Coupon routes
router.get('/', couponController.getAllCoupons);
router.get('/:id', couponController.getCoupon);
router.get('/code/:code', couponController.getCouponByCode);

module.exports = router;
