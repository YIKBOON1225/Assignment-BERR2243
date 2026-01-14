const User = require('../models/User');
const Ride = require('../models/Ride'); 
// @desc    Get all users (Manage Users)
// @route   GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Delete a user (Manage Users)
// @route   DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User removed by Admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    View all rides (Monitoring)
// @route   GET /api/admin/rides
exports.getAllRides = async (req, res) => {
  try {
    // .populate() replaces the IDs with actual names from the User collection
    const rides = await Ride.find()
      .populate('passenger', 'name email')
      .populate('driver', 'name email');
      
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};