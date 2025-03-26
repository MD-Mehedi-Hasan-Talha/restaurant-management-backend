const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
