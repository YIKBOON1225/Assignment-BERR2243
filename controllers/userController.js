const User = require('../models/User');

// @desc Register a new user
// @route POST /api/users/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ name, email, password, role, phone });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: "User registered successfully!"
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};