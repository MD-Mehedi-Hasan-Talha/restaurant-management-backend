const Restaurant = require('../../models/Restaurant');
const RestaurantOwner = require('../../models/RestaurantOwner');

module.exports = {
  // Query resolvers
  getRestaurant: async (_, { id }) => {
    try {
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      return restaurant;
    } catch (error) {
      throw new Error(`Error fetching restaurant: ${error.message}`);
    }
  },

  getAllRestaurants: async () => {
    try {
      const restaurants = await Restaurant.find();
      return restaurants;
    } catch (error) {
      throw new Error(`Error fetching restaurants: ${error.message}`);
    }
  },

  getRestaurantsByLocation: async (_, { location }) => {
    try {
      const restaurants = await Restaurant.find({ location: { $regex: location, $options: 'i' } });
      return restaurants;
    } catch (error) {
      throw new Error(`Error fetching restaurants by location: ${error.message}`);
    }
  },

  getRestaurantsByOwner: async (_, { ownerId }) => {
    try {
      const owner = await RestaurantOwner.findById(ownerId);
      if (!owner) {
        throw new Error('Restaurant owner not found');
      }
      
      const restaurants = await Restaurant.find({ ownerId });
      return restaurants;
    } catch (error) {
      throw new Error(`Error fetching restaurants by owner: ${error.message}`);
    }
  },

  // Mutation resolvers
  createRestaurant: async (_, { input }) => {
    try {
      // Validate owner exists
      const ownerExists = await RestaurantOwner.findById(input.ownerId);
      if (!ownerExists) {
        throw new Error('Restaurant owner not found');
      }

      const restaurant = new Restaurant({
        name: input.name,
        address: input.address,
        location: input.location,
        cuisine: input.cuisine,
        priceRange: input.priceRange,
        openingHours: input.openingHours,
        contactNumber: input.contactNumber,
        email: input.email,
        description: input.description,
        ownerId: input.ownerId,
        image: input.image
      });

      const savedRestaurant = await restaurant.save();
      return savedRestaurant;
    } catch (error) {
      throw new Error(`Error creating restaurant: ${error.message}`);
    }
  },

  updateRestaurant: async (_, { id, input }) => {
    try {
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }

      // Update fields
      Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
          restaurant[key] = input[key];
        }
      });

      const updatedRestaurant = await restaurant.save();
      return updatedRestaurant;
    } catch (error) {
      throw new Error(`Error updating restaurant: ${error.message}`);
    }
  },

  deleteRestaurant: async (_, { id }) => {
    try {
      const result = await Restaurant.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting restaurant: ${error.message}`);
    }
  }
};
