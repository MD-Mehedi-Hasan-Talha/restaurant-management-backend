const Settings = require('../../models/Settings');
const Restaurant = require('../../models/Restaurant');

module.exports = {
  // Query resolvers
  getSettings: async (_, { id }) => {
    try {
      const settings = await Settings.findById(id);
      if (!settings) {
        throw new Error('Settings not found');
      }
      return settings;
    } catch (error) {
      throw new Error(`Error fetching settings: ${error.message}`);
    }
  },

  getSettingsByRestaurant: async (_, { restaurantId }) => {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      const settings = await Settings.findOne({ restaurantId });
      return settings;
    } catch (error) {
      throw new Error(`Error fetching settings by restaurant: ${error.message}`);
    }
  },

  // Mutation resolvers
  createSettings: async (_, { input }) => {
    try {
      // Validate restaurant exists
      const restaurant = await Restaurant.findById(input.restaurantId);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      // Check if settings already exist for this restaurant
      const existingSettings = await Settings.findOne({ restaurantId: input.restaurantId });
      if (existingSettings) {
        throw new Error('Settings already exist for this restaurant');
      }

      const settings = new Settings({
        restaurantId: input.restaurantId,
        deliveryFee: input.deliveryFee,
        minOrderAmount: input.minOrderAmount,
        maxDeliveryDistance: input.maxDeliveryDistance,
        autoAcceptOrders: input.autoAcceptOrders !== undefined ? input.autoAcceptOrders : false,
        preparationTime: input.preparationTime,
        taxRate: input.taxRate,
        allowPreOrders: input.allowPreOrders !== undefined ? input.allowPreOrders : true,
        isActive: input.isActive !== undefined ? input.isActive : true
      });

      const savedSettings = await settings.save();
      return savedSettings;
    } catch (error) {
      throw new Error(`Error creating settings: ${error.message}`);
    }
  },

  updateSettings: async (_, { id, input }) => {
    try {
      const settings = await Settings.findById(id);
      if (!settings) {
        throw new Error('Settings not found');
      }

      // Update fields
      Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
          settings[key] = input[key];
        }
      });

      const updatedSettings = await settings.save();
      return updatedSettings;
    } catch (error) {
      throw new Error(`Error updating settings: ${error.message}`);
    }
  },

  deleteSettings: async (_, { id }) => {
    try {
      const result = await Settings.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting settings: ${error.message}`);
    }
  }
};
