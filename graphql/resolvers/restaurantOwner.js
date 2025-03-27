const RestaurantOwner = require('../../models/RestaurantOwner');
const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');

module.exports = {
  // Query resolvers
  getRestaurantOwner: async (_, { id }) => {
    try {
      const owner = await RestaurantOwner.findById(id);
      if (!owner) {
        throw new Error('Restaurant owner not found');
      }
      return owner;
    } catch (error) {
      throw new Error(`Error fetching restaurant owner: ${error.message}`);
    }
  },

  getRestaurantOwnerByUser: async (_, { userId }) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const owner = await RestaurantOwner.findOne({ userId });
      return owner;
    } catch (error) {
      throw new Error(`Error fetching restaurant owner by user: ${error.message}`);
    }
  },

  getRestaurantOwnerByRestaurant: async (_, { restaurantId }) => {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      const owner = await RestaurantOwner.findById(restaurant.ownerId);
      return owner;
    } catch (error) {
      throw new Error(`Error fetching restaurant owner by restaurant: ${error.message}`);
    }
  },

  // Mutation resolvers
  createRestaurantOwner: async (_, { input }) => {
    try {
      // Validate user exists
      const user = await User.findById(input.userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Check if user is already a restaurant owner
      const existingOwner = await RestaurantOwner.findOne({ userId: input.userId });
      if (existingOwner) {
        throw new Error('User is already a restaurant owner');
      }
      
      // Update user role if needed
      if (user.role !== 'owner') {
        user.role = 'owner';
        await user.save();
      }

      const owner = new RestaurantOwner({
        userId: input.userId,
        businessName: input.businessName,
        businessAddress: input.businessAddress,
        taxId: input.taxId,
        contactInfo: input.contactInfo
      });

      const savedOwner = await owner.save();
      return savedOwner;
    } catch (error) {
      throw new Error(`Error creating restaurant owner: ${error.message}`);
    }
  },

  updateRestaurantOwner: async (_, { id, input }) => {
    try {
      const owner = await RestaurantOwner.findById(id);
      if (!owner) {
        throw new Error('Restaurant owner not found');
      }

      // Update fields
      Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
          owner[key] = input[key];
        }
      });

      const updatedOwner = await owner.save();
      return updatedOwner;
    } catch (error) {
      throw new Error(`Error updating restaurant owner: ${error.message}`);
    }
  },

  deleteRestaurantOwner: async (_, { id }) => {
    try {
      const owner = await RestaurantOwner.findById(id);
      if (!owner) {
        throw new Error('Restaurant owner not found');
      }
      
      // Update user role back to customer
      const user = await User.findById(owner.userId);
      if (user) {
        user.role = 'customer';
        await user.save();
      }
      
      const result = await RestaurantOwner.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting restaurant owner: ${error.message}`);
    }
  }
};
