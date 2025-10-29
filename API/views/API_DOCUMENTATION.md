API Port de Plaisance Russel
Base URL : http://localhost:3000

Authentification
POST /users/login : se connecter
Body JSON :
{
"email": "test.user@example.com",
"password": "Test1234!"
}
Réponse :
{
"message": "Connexion réussie",
"token": "le token"
}

Utilisateurs
• GET /users : liste tous les utilisateurs
• GET /users/:email : détails d’un utilisateur
• POST /users : créer un utilisateur
• PUT /users/:email : modifier un utilisateur
• DELETE /users/:email : supprimer un utilisateur

Catways
• GET /catways : liste tous les catways
• GET /catways/:id : détails d’un catway
• POST /catways : créer un catway
• PUT /catways/:id : modifier la description d’un catway
• DELETE /catways/:id : supprimer un catway

Réservations
• GET /catways/:id/reservations : liste toutes les réservations d’un catway
• GET /catways/:id/reservations/:idRes : détails d’une réservation
• POST /catways/:id/reservations : créer une réservation
• PUT /catways/:id/reservations/:idRes : modifier une réservation
• DELETE /catways/:id/reservations/:idRes : supprimer une réservation

Déconnexion
• GET /users/logout : supprime le token côté client
