// server.js
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const express = require('express');
const connectDB = require('../config/db.js');
const userRoutes = require('../routes/userRoutes.js');
const driverRoutes = require('../routes/driverRoutes');
const adminRoutes = require('../routes/adminRoutes');
const rideRoutes = require('../routes/rideRoutes.js');
const authRoutes = require('../routes/authRoutes.js');

console.log('Starting MyTaxi backend...');
console.log('About to start listening...');

// Connect to database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Allows server to accept JSON data in the body
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/auth', authRoutes);

// Basic Route (Test if server is running)
app.get('/', (req, res) => {
  res.send('MyTaxi API is running...');
});

// Start Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
