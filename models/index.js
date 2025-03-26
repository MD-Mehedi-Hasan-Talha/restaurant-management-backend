// This file will serve as an entry point for all models
// Database connection and model exports

const mongoose = require('mongoose');

// Import all models
const Restaurant = require('./Restaurant');
const Menu = require('./Menu');
const User = require('./User');
const RestaurantOwner = require('./RestaurantOwner');
const PaymentMethod = require('./PaymentMethod');
const Order = require('./Order');
const Cart = require('./Cart');
const Review = require('./Review');
const Settings = require('./Settings');
const Coupon = require('./Coupon');

// Export all models
module.exports = {
  Restaurant,
  Menu,
  User,
  RestaurantOwner,
  PaymentMethod,
  Order,
  Cart,
  Review,
  Settings,
  Coupon
};
