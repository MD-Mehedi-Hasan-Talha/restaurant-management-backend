// Import shared data store
const dataStore = require('../data');
const { customers, getNextCustomerId } = dataStore;

const customerResolvers = {
  // Queries
  getCustomer: ({ id }) => {
    return customers.find(customer => customer.id === id);
  },
  
  getAllCustomers: () => {
    return customers;
  },
  
  // Mutations
  createCustomer: ({ name, email, phone }) => {
    const customer = {
      id: getNextCustomerId(),
      name,
      email,
      phone,
      orders: []
    };
    
    customers.push(customer);
    return customer;
  },
  
  updateCustomer: ({ id, name, email, phone }) => {
    const customerIndex = customers.findIndex(customer => customer.id === id);
    
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }
    
    const updatedCustomer = {
      ...customers[customerIndex],
      name: name || customers[customerIndex].name,
      email: email !== undefined ? email : customers[customerIndex].email,
      phone: phone !== undefined ? phone : customers[customerIndex].phone
    };
    
    customers[customerIndex] = updatedCustomer;
    return updatedCustomer;
  },
  
  deleteCustomer: ({ id }) => {
    const initialLength = customers.length;
    const newCustomers = customers.filter(customer => customer.id !== id);
    
    if (newCustomers.length === initialLength) {
      return false;
    }
    
    // Update the global array
    customers.length = 0;
    customers.push(...newCustomers);
    
    return true;
  }
};

module.exports = customerResolvers;
