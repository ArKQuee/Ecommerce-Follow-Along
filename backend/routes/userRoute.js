const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration route
router.post('/register', userController.signup);

// User login route
router.post('/login', userController.login);

// Get user profile route


module.exports = router;