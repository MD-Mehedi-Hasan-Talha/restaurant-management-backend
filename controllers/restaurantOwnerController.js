const RestaurantOwner = require('../models/RestaurantOwner');

exports.getAllRestaurantOwners = async (req, res) => {
  try {
    const owners = await RestaurantOwner.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurantOwner = async (req, res) => {
  try {
    const owner = await RestaurantOwner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ error: 'Restaurant owner not found' });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurantOwnerByUser = async (req, res) => {
  try {
    const owner = await RestaurantOwner.findOne({ userId: req.params.userId });
    if (!owner) {
      return res.status(404).json({ error: 'Restaurant owner not found' });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRestaurantOwnerByRestaurant = async (req, res) => {
  try {
    const owner = await RestaurantOwner.findOne({ restaurantId: req.params.restaurantId });
    if (!owner) {
      return res.status(404).json({ error: 'Restaurant owner not found' });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRestaurantOwner = async (req, res) => {
  try {
    const owner = new RestaurantOwner(req.body);
    await owner.save();
    res.status(201).json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRestaurantOwner = async (req, res) => {
  try {
    const owner = await RestaurantOwner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!owner) {
      return res.status(404).json({ error: 'Restaurant owner not found' });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRestaurantOwner = async (req, res) => {
  try {
    const owner = await RestaurantOwner.findByIdAndDelete(req.params.id);
    if (!owner) {
      return res.status(404).json({ error: 'Restaurant owner not found' });
    }
    res.json({ message: 'Restaurant owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
