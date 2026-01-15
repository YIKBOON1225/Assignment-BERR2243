const Ride = require('../models/Ride');

// Passenger: Request Ride
exports.requestRide = async (req, res) => {
    const { pickupLocation, destination, fare } = req.body;
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

// @desc    Driver completes a ride
// @route   PUT /api/rides/complete/:id
exports.completeRide = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        // Verify that the user completing the ride is actually the driver assigned to it
        if (ride.driver.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to complete this ride" });
        }

        ride.status = 'Completed';
        await ride.save();

        res.status(200).json({ success: true, data: ride });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel a ride (Passenger or Driver)
// @route   PUT /api/rides/cancel/:id
exports.cancelRide = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        // Only allow the specific Passenger OR the Driver to cancel
        if (ride.passenger.toString() !== req.user.id && ride.driver?.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to cancel this ride" });
        }

        ride.status = 'Cancelled';
        await ride.save();

        res.status(200).json({ success: true, message: "Ride cancelled", data: ride });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get History
exports.getMyHistory = async (req, res) => {
    try {
        let query;
        if (req.user.role === 'Passenger') {
            query = { passenger: req.user.id };
        } else if (req.user.role === 'Driver') {
            query = { driver: req.user.id };
        }
        const rides = await Ride.find(query).sort({ createdAt: -1 });
        res.status(200).json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Available Rides
exports.getAvailableRides = async (req, res) => {
    try {
        const rides = await Ride.find({ status: 'Requested' }).sort({ createdAt: -1 });
        res.status(200).json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};