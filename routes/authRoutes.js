const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route d'enregistrement
router.post('/register', registerUser);

// Route de connexion
router.post('/login', loginUser);

module.exports = router;
