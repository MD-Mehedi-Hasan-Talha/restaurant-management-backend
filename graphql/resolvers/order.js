// Import shared data store
const dataStore = require('../data');
const { orders, menuItems, getNextOrderId } = dataStore;

const orderResolvers = {
  // Queries
  getOrder: ({ id }) => {
    return orders.find(order => order.id === id);
  },
  
  getAllOrders: () => {
    return orders;
  },
  
  getOrdersByStatus: ({ status }) => {
    return orders.filter(order => order.status === status);
  },
  
  // Mutations
  createOrder: ({ tableNumber, items }) => {
    // Calculate order details
    const orderItems = items.map(item => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      
      if (!menuItem) {
        throw new Error(`Menu item with ID ${item.menuItemId} not found`);
      }
      
      return {
        menuItem,
        quantity: item.quantity,
        price: menuItem.price * item.quantity
      };
    });
    
    const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);
    
    const order = {
      id: getNextOrderId(),
      tableNumber,
      items: orderItems,
      status: 'pending',
      totalAmount,
      createdAt: new Date().toISOString(),
      updatedAt: null
    };
    
    orders.push(order);
    return order;
  },
  
  updateOrderStatus: ({ id, status }) => {
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    const updatedOrder = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    
    orders[orderIndex] = updatedOrder;
    return updatedOrder;
  },
  
  addItemToOrder: ({ orderId, item }) => {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
    
    if (!menuItem) {
      throw new Error(`Menu item with ID ${item.menuItemId} not found`);
    }
    
    const newOrderItem = {
      menuItem,
      quantity: item.quantity,
      price: menuItem.price * item.quantity
    };
    
    const updatedOrder = {
      ...orders[orderIndex],
      items: [...orders[orderIndex].items, newOrderItem],
      updatedAt: new Date().toISOString()
    };
    
    // Recalculate total amount
    updatedOrder.totalAmount = updatedOrder.items.reduce((sum, item) => sum + item.price, 0);
    
    orders[orderIndex] = updatedOrder;
    return updatedOrder;
  },
  
  removeItemFromOrder: ({ orderId, menuItemId }) => {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    const updatedItems = orders[orderIndex].items.filter(
      item => item.menuItem.id !== menuItemId
    );
    
    if (updatedItems.length === orders[orderIndex].items.length) {
      throw new Error(`Menu item with ID ${menuItemId} not found in order`);
    }
    
    const updatedOrder = {
      ...orders[orderIndex],
      items: updatedItems,
      updatedAt: new Date().toISOString()
    };
    
    // Recalculate total amount
    updatedOrder.totalAmount = updatedOrder.items.reduce((sum, item) => sum + item.price, 0);
    
    orders[orderIndex] = updatedOrder;
    return updatedOrder;
  }
};

module.exports = orderResolvers;
