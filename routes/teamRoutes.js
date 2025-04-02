const express = require('express');
const router = express.Router();
const { createTeam, getTeams, addMemberToTeam } = require('../controllers/teamController');
const authMiddleware = require('../middleware/authMiddleware');

// Créer une équipe
router.post('/', authMiddleware, createTeam);

// Obtenir toutes les équipes
router.get('/', authMiddleware, getTeams);

// Ajouter un membre à une équipe
router.put('/:teamId/members/:userId', authMiddleware, addMemberToTeam);

module.exports = router;
