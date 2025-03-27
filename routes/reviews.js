const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Review routes
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReview);
router.get('/user/:userId', reviewController.getReviewsByUser);
router.get('/restaurant/:restaurantId', reviewController.getReviewsByRestaurant);

module.exports = router;
