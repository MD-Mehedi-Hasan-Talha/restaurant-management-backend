const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  thumbnail: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);
