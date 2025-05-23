<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends \Illuminate\Routing\Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required'
        ]);

        $utilisateur = Utilisateur::where('email', $request->email)->first();

        if (!$utilisateur || !Hash::check($request->mot_de_passe, $utilisateur->mot_de_passe)) {
            return response()->json(['error' => 'Identifiants incorrects'], 401);
        }

        // ✅ Génère un token aléatoire ou utilise l'id utilisateur
        $token = Str::random(60);

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'utilisateur' => [
                'id' => $utilisateur->id,
                'nom' => $utilisateur->nom,
                'prenom' => $utilisateur->prenom,
                'email' => $utilisateur->email,
                'role_id' => $utilisateur->role_id
            ]
        ]);
    }
}