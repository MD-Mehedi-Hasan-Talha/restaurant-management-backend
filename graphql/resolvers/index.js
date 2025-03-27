// Import specific resolvers
const menuItemResolvers = require('./menuItem');
const orderResolvers = require('./order');
const customerResolvers = require('./customer');
const cartResolvers = require('./cart');
const restaurantResolvers = require('./restaurant');
const menuResolvers = require('./menu');
const userResolvers = require('./user');
const restaurantOwnerResolvers = require('./restaurantOwner');
const paymentMethodResolvers = require('./paymentMethod');
const reviewResolvers = require('./review');
const settingsResolvers = require('./settings');
const couponResolvers = require('./coupon');

// Combine all resolvers
const rootResolver = {
  ...menuItemResolvers,
  ...orderResolvers,
  ...customerResolvers,
  ...cartResolvers,
  ...restaurantResolvers,
  ...menuResolvers,
  ...userResolvers,
  ...restaurantOwnerResolvers,
  ...paymentMethodResolvers,
  ...reviewResolvers,
  ...settingsResolvers,
  ...couponResolvers
};

module.exports = rootResolver;
