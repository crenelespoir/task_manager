const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "Cet utilisateur existe déjà" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  
  await newUser.save();
  res.status(201).json({ message: "Utilisateur enregistré avec succès !" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: "Connexion réussie", token });
};

module.exports = { registerUser, loginUser };
