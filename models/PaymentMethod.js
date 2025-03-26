const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cardNumber: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  cvv: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
