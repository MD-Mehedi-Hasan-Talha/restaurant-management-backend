// Import shared data store
const dataStore = require('../data');
const { menuItems, getNextMenuItemId } = dataStore;

const menuItemResolvers = {
  // Queries
  getMenuItem: ({ id }) => {
    return menuItems.find(item => item.id === id);
  },
  
  getAllMenuItems: () => {
    return menuItems;
  },
  
  getMenuItemsByCategory: ({ category }) => {
    return menuItems.filter(item => item.category === category);
  },
  
  // Mutations
  createMenuItem: ({ name, description, price, category, available }) => {
    const menuItem = {
      id: getNextMenuItemId(),
      name,
      description,
      price,
      category,
      available
    };
    
    menuItems.push(menuItem);
    return menuItem;
  },
  
  updateMenuItem: ({ id, name, description, price, category, available }) => {
    const menuItemIndex = menuItems.findIndex(item => item.id === id);
    
    if (menuItemIndex === -1) {
      throw new Error('Menu item not found');
    }
    
    const updatedMenuItem = {
      ...menuItems[menuItemIndex],
      name: name || menuItems[menuItemIndex].name,
      description: description !== undefined ? description : menuItems[menuItemIndex].description,
      price: price || menuItems[menuItemIndex].price,
      category: category || menuItems[menuItemIndex].category,
      available: available !== undefined ? available : menuItems[menuItemIndex].available
    };
    
    menuItems[menuItemIndex] = updatedMenuItem;
    return updatedMenuItem;
  },
  
  deleteMenuItem: ({ id }) => {
    const initialLength = menuItems.length;
    const newMenuItems = menuItems.filter(item => item.id !== id);
    
    if (newMenuItems.length === initialLength) {
      return false;
    }
    
    // Update the global array
    menuItems.length = 0;
    menuItems.push(...newMenuItems);
    
    return true;
  }
};

module.exports = menuItemResolvers;
