// Shared in-memory data store for GraphQL resolvers
// This will be replaced with database connections in a production environment

// Menu Items
const menuItems = [];
let nextMenuItemId = 1;

// Orders
const orders = [];
let nextOrderId = 1;

// Customers
const customers = [];
let nextCustomerId = 1;

module.exports = {
  // Data collections
  menuItems,
  orders,
  customers,
  
  // ID generators
  getNextMenuItemId: () => String(nextMenuItemId++),
  getNextOrderId: () => String(nextOrderId++),
  getNextCustomerId: () => String(nextCustomerId++)
};
