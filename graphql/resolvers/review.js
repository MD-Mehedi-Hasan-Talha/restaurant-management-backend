const Review = require('../../models/Review');
const Restaurant = require('../../models/Restaurant');
const User = require('../../models/User');

module.exports = {
  // Query resolvers
  getReview: async (_, { id }) => {
    try {
      const review = await Review.findById(id);
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    } catch (error) {
      throw new Error(`Error fetching review: ${error.message}`);
    }
  },

  getAllReviews: async () => {
    try {
      const reviews = await Review.find();
      return reviews;
    } catch (error) {
      throw new Error(`Error fetching reviews: ${error.message}`);
    }
  },

  getReviewsByRestaurant: async (_, { restaurantId }) => {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      const reviews = await Review.find({ restaurantId });
      return reviews;
    } catch (error) {
      throw new Error(`Error fetching reviews by restaurant: ${error.message}`);
    }
  },

  getReviewsByUser: async (_, { userId }) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const reviews = await Review.find({ userId });
      return reviews;
    } catch (error) {
      throw new Error(`Error fetching reviews by user: ${error.message}`);
    }
  },

  // Mutation resolvers
  createReview: async (_, { input }) => {
    try {
      // Validate restaurant exists
      const restaurant = await Restaurant.findById(input.restaurantId);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      // Validate user exists
      const user = await User.findById(input.userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Check if user has already reviewed this restaurant
      const existingReview = await Review.findOne({
        userId: input.userId,
        restaurantId: input.restaurantId
      });
      
      if (existingReview) {
        throw new Error('User has already reviewed this restaurant');
      }

      const review = new Review({
        rating: input.rating,
        comment: input.comment,
        userId: input.userId,
        restaurantId: input.restaurantId
      });

      const savedReview = await review.save();
      return savedReview;
    } catch (error) {
      throw new Error(`Error creating review: ${error.message}`);
    }
  },

  updateReview: async (_, { id, input }) => {
    try {
      const review = await Review.findById(id);
      if (!review) {
        throw new Error('Review not found');
      }

      // Update fields
      if (input.rating !== undefined) review.rating = input.rating;
      if (input.comment !== undefined) review.comment = input.comment;

      const updatedReview = await review.save();
      return updatedReview;
    } catch (error) {
      throw new Error(`Error updating review: ${error.message}`);
    }
  },

  deleteReview: async (_, { id }) => {
    try {
      const result = await Review.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting review: ${error.message}`);
    }
  }
};
