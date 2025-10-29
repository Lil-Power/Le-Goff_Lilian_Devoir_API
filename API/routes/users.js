const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const private = require("../middlewares/private");

const SECRET_KEY = process.env.SECRET_KEY || "secret123";

// Liste tous les utilisateurs
router.get("/", private.checkJWT, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Détail d'un utilisateur
router.get("/:email", private.checkJWT, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }, "-password");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un utilisateur
router.post("/", async (req, res) => {
  try {
    const { name, firstname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const user = new User({ name, firstname, email, password });
    await user.save();
    res
      .status(201)
      .json({ message: "Utilisateur créé", user: { name, firstname, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Modifier un utilisateur
router.put("/:email", private.checkJWT, async (req, res) => {
  try {
    const { name, firstname, password } = req.body;

    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (name) user.name = name;
    if (firstname) user.firstname = firstname;
    if (password) user.password = password;

    await user.save();
    res.json({ message: "Utilisateur mis à jour" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Supprimer un utilisateur
router.delete("/:email", private.checkJWT, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Connexion réussie", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout (côté client)
router.get("/logout", (req, res) => {
  res.json({
    message: "Déconnexion réussie, supprimez votre token côté client",
  });
});

module.exports = router;
