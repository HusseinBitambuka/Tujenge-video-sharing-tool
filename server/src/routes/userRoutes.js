const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

// User registration
router.post('/register', UserController.register);

// User login
router.post('/login', UserController.login);

module.exports = router;
