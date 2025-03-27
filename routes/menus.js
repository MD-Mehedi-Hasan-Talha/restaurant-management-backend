const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Menu routes
router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenu);
router.get('/restaurant/:restaurantId', menuController.getMenusByRestaurant);

module.exports = router;
