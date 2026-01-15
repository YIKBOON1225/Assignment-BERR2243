const express = require('express');
const router = express.Router();
const { 
    requestRide, 
    acceptRide, 
    getAllRides, 
    completeRide, 
    cancelRide, 
    getMyHistory, 
    getAvailableRides 
} = require('../controllers/rideController');
const { protect, authorize } = require('../middleware/auth');

router.post('/request', protect, authorize('Passenger'), requestRide);
router.put('/accept/:id', protect, authorize('Driver'), acceptRide);
router.get('/all', protect, authorize('Admin'), getAllRides);
router.put('/complete/:id', protect, authorize('Driver'), completeRide);
router.put('/cancel/:id', protect, cancelRide);
router.get('/my-history', protect, getMyHistory);
router.get('/available', protect, authorize('Driver'), getAvailableRides);

module.exports = router;
