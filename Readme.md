# API Port de Plaisance Russel

Cette application propose une API RESTful permettant de gérer les **catways**, les **réservations** et les **utilisateurs** d’un port de plaisance.

## Fonctionnalités principales

- **Authentification JWT** (connexion, création d’utilisateur)
- **Gestion des utilisateurs** (CRUD)
- **Gestion des catways** (CRUD)
- **Gestion des réservations** (CRUD par catway)
- Sécurisation des routes via token JWT
- Réponses normalisées en JSON

## Technologies utilisées

- **Node.js** (v18+)
- **Express.js**
- **MongoDB / Mongoose**
- **bcrypt** – pour le hachage des mots de passe
- **jsonwebtoken (JWT)** – pour l’authentification
- **CORS**, **cookie-parser**, **morgan**
- **nodemon** (en développement)
- **env-cmd** – pour la gestion des environnements

## Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé :

- [Node.js]
- [MongoDB] ou un accès à MongoDB Atlas
- [npm]/ [yarn]

## Installation

1. **Cloner le projet :**

git clone https://github.com/Lil-Power/Le-Goff_Lilian_Devoir_API.git
cd Le-Goff_Lilian_Devoir_API/API
Installer les dépendances :

npm install
Configurer les variables d’environnement :
Crée un fichier .env dans /API/env/ contenant :

PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/port
JWT_SECRET=secret_key

Lancement de l’application
En développement :
npm run dev
En production :
npm start

L’API sera accessible à l’adresse :
http://localhost:3000

Routes principales
Authentification
POST /users/login – Connexion d’un utilisateur
Body :

{
"email": "test.user@example.com",
"password": "Test1234!"
}
Réponse :

{
"message": "Connexion réussie",
"token": "<votre_token_jwt>"
}

Utilisateurs
Méthode Route Description
GET /users Liste tous les utilisateurs
GET /users/:email Affiche les détails d’un utilisateur
POST /users Crée un utilisateur
PUT /users/:email Modifie un utilisateur
DELETE /users/:email Supprime un utilisateur

Catways
Méthode Route Description
GET /catways Liste tous les catways
GET /catways/:id Détails d’un catway
POST /catways Crée un catway
PUT /catways/:id Modifie un catway
DELETE /catways/:id Supprime un catway

Réservations
Méthode Route Description
GET /catways/:id/reservations Liste les réservations d’un catway
GET /catways/:id/reservations/:idRes Détails d’une réservation
POST /catways/:id/reservations Crée une réservation
PUT /catways/:id/reservations/:idRes Modifie une réservation
DELETE /catways/:id/reservations/:idRes Supprime une réservation

Déconnexion
GET /users/logout – Supprime le token côté client

Notes
L’API renvoie des réponses au format JSON.
