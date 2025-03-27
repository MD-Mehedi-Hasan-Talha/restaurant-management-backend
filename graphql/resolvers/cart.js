const Cart = require('../../models/Cart');
const Menu = require('../../models/Menu');
const User = require('../../models/User');
const mongoose = require('mongoose');

module.exports = {
  // Query resolvers
  getCart: async (_, { id }) => {
    try {
      const cart = await Cart.findById(id);
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      throw new Error(`Error fetching cart: ${error.message}`);
    }
  },

  getCartByUser: async (_, { userId }) => {
    try {
      const cart = await Cart.findOne({ userId });
      return cart;
    } catch (error) {
      throw new Error(`Error fetching cart by user: ${error.message}`);
    }
  },

  // Mutation resolvers
  createCart: async (_, { input }) => {
    try {
      // Validate user exists
      const userExists = await User.findById(input.userId);
      if (!userExists) {
        throw new Error('User not found');
      }

      // Validate menu items exist
      for (const item of input.items) {
        const menuExists = await Menu.findById(item.menu);
        if (!menuExists) {
          throw new Error(`Menu item with ID ${item.menu} not found`);
        }
      }

      // Check if cart already exists for user
      const existingCart = await Cart.findOne({ userId: input.userId });
      if (existingCart) {
        throw new Error('User already has a cart');
      }

      const cart = new Cart({
        items: input.items,
        userId: input.userId
      });

      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`);
    }
  },

  updateCart: async (_, { id, input }) => {
    try {
      const cart = await Cart.findById(id);
      if (!cart) {
        throw new Error('Cart not found');
      }

      if (input.items) {
        // Validate menu items exist
        for (const item of input.items) {
          const menuExists = await Menu.findById(item.menu);
          if (!menuExists) {
            throw new Error(`Menu item with ID ${item.menu} not found`);
          }
        }
        cart.items = input.items;
      }

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  },

  deleteCart: async (_, { id }) => {
    try {
      const result = await Cart.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  },

  addItemToCart: async (_, { cartId, item }) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      // Validate menu item exists
      const menuExists = await Menu.findById(item.menu);
      if (!menuExists) {
        throw new Error(`Menu item with ID ${item.menu} not found`);
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        cartItem => cartItem.menu.toString() === item.menu
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item already exists
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item to cart
        cart.items.push(item);
      }

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error(`Error adding item to cart: ${error.message}`);
    }
  },

  removeItemFromCart: async (_, { cartId, menuId }) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      // Filter out the item to remove
      cart.items = cart.items.filter(
        item => item.menu.toString() !== menuId
      );

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error(`Error removing item from cart: ${error.message}`);
    }
  }
};
