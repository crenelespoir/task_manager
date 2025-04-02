const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Créer une tâche
router.post('/', authMiddleware, createTask);

// Obtenir les tâches
router.get('/', authMiddleware, getTasks);

// Modifier une tâche
router.put('/:id', authMiddleware, updateTask);

// Supprimer une tâche
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
