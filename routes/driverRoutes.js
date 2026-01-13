const express = require('express');
const router = express.Router();
const { 
  getPassengerInfo, 
  updateDriverProfile, 
  deleteDriverAccount 
} = require('../controllers/driverController');

router.get('/passenger/:id', getPassengerInfo);
router.put('/profile/:id', updateDriverProfile);
router.delete('/account/:id', deleteDriverAccount);

module.exports = router;