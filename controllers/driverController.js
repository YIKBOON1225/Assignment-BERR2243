const User = require('../models/User');

// @desc    Get Passenger info (by ID)
// @route   GET /api/driver/passenger/:id
exports.getPassengerInfo = async (req, res) => {
  try {
    const passenger = await User.findById(req.params.id).select('-password'); // Don't show password
    if (!passenger || passenger.role !== 'Passenger') {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Driver Profile
// @route   PUT /api/driver/profile/:id
exports.updateDriverProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // The data sent from Postman (e.g. phone, name)
      { new: true } // Return the updated document
    ).select('-password');
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Driver Account
// @route   DELETE /api/driver/account/:id
exports.deleteDriverAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Driver account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};