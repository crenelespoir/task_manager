const Task = require('../models/task');
const mongoose = require('mongoose');

const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const createdBy = req.user.id;

  const newTask = new Task({ title, description, priority, createdBy });
  await newTask.save();
  res.status(201).json(newTask);
};

const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Page actuelle (par défaut 1)
    const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (par défaut 10)
    const skip = (page - 1) * limit; // Calcul du nombre de tâches à ignorer

    // Récupérer les filtres depuis la requête
    const { priority, status } = req.query;

    // Créer un objet de filtre
    let filter = {};

    if (priority) {
      filter.priority = priority; // Filtrer par priorité
    }

    if (status) {
      filter.status = status; // Filtrer par statut
    }

    // Récupérer les tâches avec pagination et filtrage
    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit);

    // Récupérer le nombre total de tâches après filtrage
    const totalTasks = await Task.countDocuments(filter);

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      tasks,
      pagination: {
        currentPage: page,
        totalPages,
        totalTasks,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;

  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.priority = priority || task.priority;
  task.status = status || task.status;

  await task.save();
  res.json(task);
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;  // Récupérer l'ID de la tâche depuis les paramètres

  // Vérifier si l'ID est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "ID de tâche invalide" });
  }

  try {
    // Utiliser findByIdAndDelete pour supprimer la tâche
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};




module.exports = { createTask, getTasks, updateTask, deleteTask };
