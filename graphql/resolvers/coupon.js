const Coupon = require('../../models/Coupon');
const Restaurant = require('../../models/Restaurant');

module.exports = {
  // Query resolvers
  getCoupon: async (_, { id }) => {
    try {
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        throw new Error('Coupon not found');
      }
      return coupon;
    } catch (error) {
      throw new Error(`Error fetching coupon: ${error.message}`);
    }
  },

  getAllCoupons: async () => {
    try {
      const coupons = await Coupon.find();
      return coupons;
    } catch (error) {
      throw new Error(`Error fetching coupons: ${error.message}`);
    }
  },

  getCouponsByRestaurant: async (_, { restaurantId }) => {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      const coupons = await Coupon.find({ restaurantId });
      return coupons;
    } catch (error) {
      throw new Error(`Error fetching coupons by restaurant: ${error.message}`);
    }
  },

  getCouponByCode: async (_, { code }) => {
    try {
      const coupon = await Coupon.findOne({ code });
      return coupon;
    } catch (error) {
      throw new Error(`Error fetching coupon by code: ${error.message}`);
    }
  },

  // Mutation resolvers
  createCoupon: async (_, { input }) => {
    try {
      // Validate restaurant exists if restaurantId is provided
      if (input.restaurantId) {
        const restaurant = await Restaurant.findById(input.restaurantId);
        if (!restaurant) {
          throw new Error('Restaurant not found');
        }
      }
      
      // Check if coupon code already exists
      const existingCoupon = await Coupon.findOne({ code: input.code });
      if (existingCoupon) {
        throw new Error('Coupon code already exists');
      }

      const coupon = new Coupon({
        code: input.code,
        discountType: input.discountType,
        discountValue: input.discountValue,
        minOrderAmount: input.minOrderAmount,
        maxDiscountAmount: input.maxDiscountAmount,
        startDate: input.startDate,
        endDate: input.endDate,
        isActive: input.isActive !== undefined ? input.isActive : true,
        usageLimit: input.usageLimit,
        usageCount: 0,
        restaurantId: input.restaurantId
      });

      const savedCoupon = await coupon.save();
      return savedCoupon;
    } catch (error) {
      throw new Error(`Error creating coupon: ${error.message}`);
    }
  },

  updateCoupon: async (_, { id, input }) => {
    try {
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        throw new Error('Coupon not found');
      }

      // If code is being updated, check if new code already exists
      if (input.code && input.code !== coupon.code) {
        const existingCoupon = await Coupon.findOne({ code: input.code });
        if (existingCoupon) {
          throw new Error('Coupon code already exists');
        }
      }

      // Update fields
      Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
          coupon[key] = input[key];
        }
      });

      const updatedCoupon = await coupon.save();
      return updatedCoupon;
    } catch (error) {
      throw new Error(`Error updating coupon: ${error.message}`);
    }
  },

  deleteCoupon: async (_, { id }) => {
    try {
      const result = await Coupon.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting coupon: ${error.message}`);
    }
  }
};
