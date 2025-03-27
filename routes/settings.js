const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Settings routes
router.get('/', settingsController.getAllSettings);
router.get('/:id', settingsController.getSettings);
router.get('/restaurant/:restaurantId', settingsController.getSettingsByRestaurant);

module.exports = router;
