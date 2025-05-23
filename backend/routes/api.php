<?php

use Illuminate\Support\Facades\Route;

// Authentification
Route::post('/auth/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

// Gestion des étudiants (réservé admin)
Route::prefix('/utilisateurs')
    ->group(function () {
        Route::post('/', [App\Http\Controllers\Api\UtilisateurController::class, 'store']);  
        Route::get('/', [App\Http\Controllers\Api\UtilisateurController::class, 'index']);   // Ajouter un étudiant
        Route::delete('/{id}', [App\Http\Controllers\Api\UtilisateurController::class, 'destroy']); // Supprimer un étudiant
    });

// Gestion des demandes
Route::prefix('/demandes')
    ->group(function () {
        Route::post('/', [App\Http\Controllers\Api\DemandeController::class, 'store']);       // Soumettre une demande (étudiant)
        Route::get('/', [App\Http\Controllers\Api\DemandeController::class, 'index']);         // Lire toutes les demandes (admin)
        Route::put('/{id}/statut', [App\Http\Controllers\Api\DemandeController::class, 'updateStatut']); // Mettre à jour statut (admin)
        Route::put('/{id}/fichier', [App\Http\Controllers\Api\DemandeController::class, 'updateFichier']);
        Route::delete('/{id}', [App\Http\Controllers\Api\DemandeController::class, 'destroy']);
    });