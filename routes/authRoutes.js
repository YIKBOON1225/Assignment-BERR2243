const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// This creates the /login endpoint
router.post('/login', login);

module.exports = router;