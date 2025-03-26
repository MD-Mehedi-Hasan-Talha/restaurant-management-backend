// Import specific resolvers
const menuItemResolvers = require('./menuItem');
const orderResolvers = require('./order');
const customerResolvers = require('./customer');

// Combine all resolvers
const rootResolver = {
  ...menuItemResolvers,
  ...orderResolvers,
  ...customerResolvers
};

module.exports = rootResolver;
