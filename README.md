# Plateforme ENSAJ - Système de gestion des demandes étudiantes

> Projet Fullstack : Frontend React + Backend Laravel  
> Pas de Sanctum / CSRF – seulement un système de token JSON  
> Objectif : permettre aux étudiants de soumettre des demandes  
> L'administrateur gère les utilisateurs et les demandes

## 🎯 Fonctionnalités principales

| Utilisateur | Peut faire |
|------------|------------|
| **Admin** | 
- 👤 Créer des comptes étudiants (`role_id = 1`)
- 🗑️ Supprimer des étudiants
- 📋 Voir toutes les demandes
- 🆕 Changer le statut d'une demande (`en_attente` → `traitee`)

| **Étudiant** |
|--------------|
| ✅ Se connecter |
| ✅ Soumettre une demande |
| ✅ Supprimer ses propres demandes  |

---

## 🛠️ Technologies utilisées

### Frontend (React)
- React 18 + JSX
- Axios pour les appels API
- react-router-dom pour la navigation
- localStorage pour stocker :
  - `token`
  - `user` (nom, prénom, rôle, id)

### Backend (Laravel 12)
- API REST
- Sans Sanctum ni middleware de session
- Routes protégées par token simple dans header `Authorization: Bearer <token>`
- Modèles :
  - `Utilisateur`
  - `Demande`
- Contrôleurs :
  - `AuthController`
  - `UtilisateurController`
  - `DemandeController`

---

## 🧱 Structure du backend

### Base de données

#### Table `utilisateurs`

| Colonne | Type | Description |
|--------|------|-------------|
| `id` | int | Clé primaire |
| `nom` | string | Nom de l’utilisateur |
| `prenom` | string | Prénom |
| `email` | string | Unique |
| `mot_de_passe` | string | Hashé avec `bcrypt()` |
| `role_id` | int | 1 = étudiant, 2 = admin |

#### Table `demandes`

| Colonne | Type | Description |
|--------|------|-------------|
| `id` | int | Clé primaire |
| `type` | string | Ex: certificat, dérogation |
| `description` | text | Message de la demande |
| `fichier` | string (nullable) | Chemin vers le fichier uploadé |
| `statut` | enum(`en_attente`, `traitee`) | Par défaut : `en_attente` |
| `utilisateur_id` | foreign key | Lieu vers `utilisateurs.id` |

---

## 📁 Routes API

POST /api/auth/login → Authentification
POST /api/utilisateurs → Créer un utilisateur (admin seulement)
DELETE /api/utilisateurs/{id} → Supprimer un utilisateur (admin)
GET /api/demandes → Voir toutes les demandes (admin)
POST /api/demandes → Soumettre une demande (étudiant)
PUT /api/demandes/{id}/statut → Modifier le statut (réservé admin)
DELETE /api/demandes/{id} → Supprimer une demande (etudiant)

## Comment lancer le projet

cote backend : php artisan serve

cote frontend : npm run dev