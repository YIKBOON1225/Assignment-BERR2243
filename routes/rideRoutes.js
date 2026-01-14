const express = require('express');
const router = express.Router();
const { requestRide, acceptRide, getAllRides } = require('../controllers/rideController');
const { protect, authorize } = require('../middleware/auth');

router.post('/request', protect, authorize('Passenger'), requestRide);
router.put('/accept/:id', protect, authorize('Driver'), acceptRide);
router.get('/all', protect, authorize('Admin'), getAllRides);

module.exports = router;