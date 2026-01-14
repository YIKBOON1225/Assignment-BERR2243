const express = require('express');
const router = express.Router();
// Import the middleware
const { protect, authorize } = require('../middleware/auth'); 
const { getAllUsers, deleteUser, getAllRides } = require('../controllers/adminController');

// Add 'protect' and 'authorize' to every route
router.get('/users', protect, authorize('Admin'), getAllUsers);
router.delete('/users/:id', protect, authorize('Admin'), deleteUser);
router.get('/rides', protect, authorize('Admin'), getAllRides);

module.exports = router;