const express = require("express");
const router = express.Router({ mergeParams: true });
const Catway = require("../models/Catway");

router.get("/", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
  res.json(catway.reservations);
});

router.get("/:idReservation", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  const reservation = catway.reservations.id(req.params.idReservation);
  if (!reservation)
    return res.status(404).json({ message: "Réservation non trouvée" });

  res.json(reservation);
});

router.post("/", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  catway.reservations.push(req.body);
  await catway.save();
  res.status(201).json(catway.reservations);
});

router.put("/:idReservation", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  const reservation = catway.reservations.id(req.params.idReservation);
  if (!reservation)
    return res.status(404).json({ message: "Réservation non trouvée" });

  Object.assign(reservation, req.body);
  await catway.save();
  res.json(reservation);
});

router.delete("/:idReservation", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  catway.reservations.id(req.params.idReservation).remove();
  await catway.save();
  res.json({ message: "Réservation supprimée" });
});

module.exports = router;
