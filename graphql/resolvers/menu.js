const Menu = require('../../models/Menu');
const Restaurant = require('../../models/Restaurant');

module.exports = {
  // Query resolvers
  getMenu: async (_, { id }) => {
    try {
      const menu = await Menu.findById(id);
      if (!menu) {
        throw new Error('Menu not found');
      }
      return menu;
    } catch (error) {
      throw new Error(`Error fetching menu: ${error.message}`);
    }
  },

  getAllMenus: async () => {
    try {
      const menus = await Menu.find();
      return menus;
    } catch (error) {
      throw new Error(`Error fetching menus: ${error.message}`);
    }
  },

  getMenusByRestaurant: async (_, { restaurantId }) => {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      const menus = await Menu.find({ restaurantId });
      return menus;
    } catch (error) {
      throw new Error(`Error fetching menus by restaurant: ${error.message}`);
    }
  },

  // Mutation resolvers
  createMenu: async (_, { input }) => {
    try {
      // Validate restaurant exists
      const restaurantExists = await Restaurant.findById(input.restaurantId);
      if (!restaurantExists) {
        throw new Error('Restaurant not found');
      }

      const menu = new Menu({
        name: input.name,
        description: input.description,
        price: input.price,
        category: input.category,
        image: input.image,
        restaurantId: input.restaurantId,
        isAvailable: input.isAvailable !== undefined ? input.isAvailable : true
      });

      const savedMenu = await menu.save();
      return savedMenu;
    } catch (error) {
      throw new Error(`Error creating menu: ${error.message}`);
    }
  },

  updateMenu: async (_, { id, input }) => {
    try {
      const menu = await Menu.findById(id);
      if (!menu) {
        throw new Error('Menu not found');
      }

      // Update fields
      Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
          menu[key] = input[key];
        }
      });

      const updatedMenu = await menu.save();
      return updatedMenu;
    } catch (error) {
      throw new Error(`Error updating menu: ${error.message}`);
    }
  },

  deleteMenu: async (_, { id }) => {
    try {
      const result = await Menu.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting menu: ${error.message}`);
    }
  }
};
