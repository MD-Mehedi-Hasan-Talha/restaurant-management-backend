const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.get('/email/:email', userController.getUserByEmail);

module.exports = router;
