const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAllRides } = require('../controllers/adminController');

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/rides', getAllRides);

module.exports = router;