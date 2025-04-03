const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());


// Route de base
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API Gestion des tâches" });
  });  

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
