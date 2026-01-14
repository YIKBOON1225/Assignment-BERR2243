const express = require('express');
const router = express.Router();
// Import Security Middleware
const { protect, authorize } = require('../middleware/auth'); 
const { 
    getPassengerInfo, 
    updateDriverProfile, 
    deleteDriverAccount 
} = require('../controllers/driverController');

// Add 'protect' and 'authorize' to lock these routes
router.get('/passenger/:id', protect, authorize('Driver'), getPassengerInfo);
router.put('/profile/:id', protect, authorize('Driver'), updateDriverProfile);
router.delete('/account/:id', protect, authorize('Driver'), deleteDriverAccount);

module.exports = router;