const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

exports.logout = async (req, res) => {
    // Since we use JWT on the client side, we just send a success message.
    res.status(200).json({
        success: true,
        message: "Logged out successfully. Please delete the token from client storage."
    });
};