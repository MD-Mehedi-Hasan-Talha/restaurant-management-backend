const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Welcome to Restaurant Management API',
    version: '1.0.0'
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
