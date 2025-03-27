const PaymentMethod = require('../../models/PaymentMethod');

module.exports = {
  // Query resolvers
  getPaymentMethod: async (_, { id }) => {
    try {
      const paymentMethod = await PaymentMethod.findById(id);
      if (!paymentMethod) {
        throw new Error('Payment method not found');
      }
      return paymentMethod;
    } catch (error) {
      throw new Error(`Error fetching payment method: ${error.message}`);
    }
  },

  getAllPaymentMethods: async () => {
    try {
      const paymentMethods = await PaymentMethod.find();
      return paymentMethods;
    } catch (error) {
      throw new Error(`Error fetching payment methods: ${error.message}`);
    }
  },

  // Mutation resolvers
  createPaymentMethod: async (_, { input }) => {
    try {
      const paymentMethod = new PaymentMethod({
        name: input.name,
        description: input.description,
        isActive: input.isActive !== undefined ? input.isActive : true,
        processingFee: input.processingFee,
        icon: input.icon
      });

      const savedPaymentMethod = await paymentMethod.save();
      return savedPaymentMethod;
    } catch (error) {
      throw new Error(`Error creating payment method: ${error.message}`);
    }
  },

  updatePaymentMethod: async (_, { id, input }) => {
    try {
      const paymentMethod = await PaymentMethod.findById(id);
      if (!paymentMethod) {
        throw new Error('Payment method not found');
      }

      // Update fields
      Object.keys(input).forEach(key => {
        if (input[key] !== undefined) {
          paymentMethod[key] = input[key];
        }
      });

      const updatedPaymentMethod = await paymentMethod.save();
      return updatedPaymentMethod;
    } catch (error) {
      throw new Error(`Error updating payment method: ${error.message}`);
    }
  },

  deletePaymentMethod: async (_, { id }) => {
    try {
      const result = await PaymentMethod.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting payment method: ${error.message}`);
    }
  }
};
