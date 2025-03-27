const Settings = require('../models/Settings');

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSettingsByRestaurant = async (req, res) => {
  try {
    const settings = await Settings.findOne({ restaurantId: req.params.restaurantId });
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSettings = async (req, res) => {
  try {
    const settings = new Settings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSettings = async (req, res) => {
  try {
    const settings = await Settings.findByIdAndDelete(req.params.id);
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json({ message: 'Settings deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
