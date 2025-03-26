const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  orderConfirm: {
    type: Boolean,
    default: true
  },
  orderStatusChange: {
    type: Boolean,
    default: true
  },
  orderDelivered: {
    type: Boolean,
    default: true
  },
  emailNotification: {
    type: Boolean,
    default: true
  },
  smsNotification: {
    type: Boolean,
    default: false
  },
  pushNotification: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
