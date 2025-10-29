require("dotenv").config({ debug: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const mongodb = require("./db/mongo");

const catwaysRouter = require("./routes/catways");
const reservationsRouter = require("./routes/reservations");

// Initialiser la connexion MongoDB
mongodb.initClientDbConnection();

const app = express();

// Configuration CORS
app.use(
  cors({
    exposedHeaders: ["Authorization"],
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "views")));

app.get("/health", (req, res) => {
  res.status(200).json({
    name: "API",
    version: "1.0",
    status: "healthy",
    database: mongodb.isConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Routes principales
app.use("/", indexRouter);
app.use("/catways", catwaysRouter);
app.use("/catways/:id/reservations", reservationsRouter);

// Gestion 404
app.use(function (req, res, next) {
  res
    .status(404)
    .json({ name: "API", version: "1.0", status: 404, message: "not_found" });
});

// GESTION DES ERREURS GLOBALES

app.use(function (err, req, res, next) {
  console.error("Erreur serveur:", err);
  res.status(err.status || 500).json({
    name: "API",
    version: "1.0",
    status: err.status || 500,
    message: err.message || "internal_server_error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// DÉMARRAGE DU SERVEUR (pour Render)

const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Serveur démarré sur le port ${port}`);
  console.log(`Environnement: ${process.env.NODE_ENV || "development"}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM reçu, fermeture gracieuse...");

  mongodb.closeConnection && mongodb.closeConnection();
  process.exit(0);
});

module.exports = app;
