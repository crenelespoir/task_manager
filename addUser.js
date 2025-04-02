const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // Importer le modèle utilisateur

// Connexion à MongoDB
const connectDB = require('./config/db');

// Données de l'utilisateur à ajouter
const name = "Crénel Espoir";
const email = "utilisateur@example.com";
const password = "motdepasse";

// Hash du mot de passe et ajout de l'utilisateur
bcrypt.hash(password, 10, async (err, hashedPassword) => {
  if (err) throw err;

  const newUser = new User({
    name,
    email,
    password: hashedPassword, // On stocke le mot de passe hashé
  });

  // Sauvegarde dans la base de données
  await newUser.save();
  console.log("Utilisateur ajouté avec succès !");
  mongoose.connection.close(); // Ferme la connexion à la base de données une fois terminé
});
