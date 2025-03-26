const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantOwnerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  area: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RestaurantOwner', restaurantOwnerSchema);
