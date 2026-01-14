const Ride = require('../models/Ride');

// Passenger: Request Ride
exports.requestRide = async (req, res) => {
    const { pickupLocation, destination } = req.body;
    const ride = await Ride.create({ passenger: req.user.id, pickupLocation, destination, fare: fare || 10 });
    res.status(201).json(ride);
};

// Driver: Accept Ride
exports.acceptRide = async (req, res) => {
    const ride = await Ride.findByIdAndUpdate(req.params.id, { driver: req.user.id, status: 'Accepted' }, { new: true });
    res.json(ride);
};

// Admin: View All Rides
exports.getAllRides = async (req, res) => {
    const rides = await Ride.find().populate('passenger driver', 'name phone');
    res.json(rides);
};