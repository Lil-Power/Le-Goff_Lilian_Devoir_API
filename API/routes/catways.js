const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");

router.get("/", async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
});

router.get("/:id", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
  res.json(catway);
});

router.post("/", async (req, res) => {
  const catway = new Catway(req.body);
  await catway.save();
  res.status(201).json(catway);
});

router.put("/:id", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  catway.stateDescription =
    req.body.stateDescription || catway.stateDescription;
  await catway.save();
  res.json(catway);
});

router.delete("/:id", async (req, res) => {
  await Catway.findByIdAndDelete(req.params.id);
  res.json({ message: "Catway supprimé" });
});

module.exports = router;
