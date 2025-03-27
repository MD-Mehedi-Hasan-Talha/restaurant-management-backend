const express = require('express');
const router = express.Router();

// Import feature routes
const restaurantsRouter = require('./restaurants');
const menusRouter = require('./menus');
const usersRouter = require('./users');
const restaurantOwnersRouter = require('./restaurantOwners');
const paymentMethodsRouter = require('./paymentMethods');
const ordersRouter = require('./orders');
const cartsRouter = require('./carts');
const reviewsRouter = require('./reviews');
const settingsRouter = require('./settings');
const couponsRouter = require('./coupons');

// Mount feature routes
router.use('/restaurants', restaurantsRouter);
router.use('/menus', menusRouter);
router.use('/users', usersRouter);
router.use('/restaurant-owners', restaurantOwnersRouter);
router.use('/payment-methods', paymentMethodsRouter);
router.use('/orders', ordersRouter);
router.use('/carts', cartsRouter);
router.use('/reviews', reviewsRouter);
router.use('/settings', settingsRouter);
router.use('/coupons', couponsRouter);

module.exports = router;
