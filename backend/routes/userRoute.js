const express = require('express');
const router = express.Router();
const { signup, login} = require('../controllers/userController');

// User registration route
router.post('/register', signup);

// User login route
router.post('/login', login);

// Get user profile route


module.exports = router;