const Team = require('../models/team');
const User = require('../models/user');

const createTeam = async (req, res) => {
  const { name, members } = req.body;

  const newTeam = new Team({ name, members });
  await newTeam.save();
  res.status(201).json(newTeam);
};

const getTeams = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

const addMemberToTeam = async (req, res) => {
  const { teamId, userId } = req.params;

  const team = await Team.findById(teamId);
  if (!team) {
    return res.status(404).json({ message: "Équipe non trouvée" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  team.members.push(user);
  await team.save();
  res.json({ message: "Membre ajouté à l'équipe", team });
};

module.exports = { createTeam, getTeams, addMemberToTeam };
