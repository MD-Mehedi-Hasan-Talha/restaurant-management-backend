const express = require('express');
const router = express.Router();
const restaurantOwnerController = require('../controllers/restaurantOwnerController');

// RestaurantOwner routes
router.get('/', restaurantOwnerController.getAllRestaurantOwners);
router.get('/:id', restaurantOwnerController.getRestaurantOwner);
router.get('/user/:userId', restaurantOwnerController.getRestaurantOwnerByUser);
router.get('/restaurant/:restaurantId', restaurantOwnerController.getRestaurantOwnerByRestaurant);

module.exports = router;
