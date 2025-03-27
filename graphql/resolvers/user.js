const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  // Query resolvers
  getUser: async (_, { id }) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },

  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  getUserByEmail: async (_, { email }) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  },

  // Mutation resolvers
  createUser: async (_, { input }) => {
    try {
      // Check if user with email already exists
      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 12);

      const user = new User({
        name: input.name,
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        address: input.address,
        role: input.role || 'customer'
      });

      const savedUser = await user.save();
      
      // Remove password from returned user object
      const userObject = savedUser.toObject();
      delete userObject.password;
      
      return userObject;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  updateUser: async (_, { id, input }) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Update fields
      if (input.name) user.name = input.name;
      if (input.email) {
        // Check if new email is already in use by another user
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser && existingUser._id.toString() !== id) {
          throw new Error('Email is already in use');
        }
        user.email = input.email;
      }
      if (input.password) {
        user.password = await bcrypt.hash(input.password, 12);
      }
      if (input.phone) user.phone = input.phone;
      if (input.address) user.address = input.address;
      if (input.role) user.role = input.role;

      const updatedUser = await user.save();
      
      // Remove password from returned user object
      const userObject = updatedUser.toObject();
      delete userObject.password;
      
      return userObject;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  deleteUser: async (_, { id }) => {
    try {
      const result = await User.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },

  loginUser: async (_, { input }) => {
    try {
      const { email, password } = input;
      
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      return {
        userId: user._id,
        token,
        tokenExpiration: 1, // 1 hour
        role: user.role
      };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
};
