const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    notes: String,
  },
  { _id: true }
);

const catwaySchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  stateDescription: { type: String },
  reservations: [reservationSchema],
});

module.exports = mongoose.model("Catway", catwaySchema);
