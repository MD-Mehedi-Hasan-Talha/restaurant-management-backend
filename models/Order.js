const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [{
    menu: {
      type: Schema.Types.ObjectId,
      ref: 'Menu',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryTime: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  couponId: {
    type: Schema.Types.ObjectId,
    ref: 'Coupon'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
