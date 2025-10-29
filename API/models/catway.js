const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
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

module.exports =
  mongoose.models.Catway || mongoose.model("Catway", catwaySchema);
