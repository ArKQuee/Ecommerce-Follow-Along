const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// Get user profile route
router.get('/profile', userController.protect, userController.getUserProfile);

// Update user profile route
router.put('/profile', userController.protect, userController.updateUserProfile);

module.exports = router;