// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db.js');
const userRoutes = require('../routes/userRoutes.js');
const driverRoutes = require('../routes/driverRoutes');
const adminRoutes = require('../routes/adminRoutes');
const rideRoutes = require('../routes/rideRoutes.js');
console.log('Starting MyTaxi backend...');
console.log('About to start listening...');

// 1. Load env vars
dotenv.config();

// 2. Connect to database
connectDB();

// 3. Initialize Express
const app = express();

// 4. Middleware
app.use(express.json()); // Allows server to accept JSON data in the body
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rides', rideRoutes);

// 5. Basic Route (Test if server is running)
app.get('/', (req, res) => {
  res.send('MyTaxi API is running...');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});