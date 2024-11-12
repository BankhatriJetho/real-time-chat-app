const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

console.log('authRoutes.js loaded');

// Test route to verify the route is registered
router.get('/test', (req, res) => {
    res.send('Auth route is working');
});

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login);

module.exports = router;

