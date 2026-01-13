const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  passenger: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Links to the User model
    required: true 
  },
  driver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Links to the User model
    default: null // Empty until a driver accepts the ride
  },
  pickupLocation: { 
    type: String, 
    required: true 
  },
  destination: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Requested', 'Accepted', 'Completed', 'Cancelled'], 
    default: 'Requested' 
  },
  fare: { 
    type: Number,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Ride', rideSchema);