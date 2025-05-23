<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Utilisateur;

class UtilisateurController extends \Illuminate\Routing\Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'mot_de_passe' => 'required|min:6',
            'role_id' => 'nullable|exists:roles,id'
        ]);

        $etudiant = Utilisateur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'mot_de_passe' => bcrypt($request->mot_de_passe),
            'role_id' => $request->role_id ?? 1
        ]);

        return response()->json($etudiant, 201);
    }

        public function index()
    {
        $etudiants = Utilisateur::where('role_id', 1)->get(); // Récupère tous les étudiants
        return response()->json($etudiants);
    }
    
    public function destroy(int $id)
{
    $etudiant = Utilisateur::find($id);

    if (!$etudiant) {
        return response()->json(['error' => 'Étudiant non trouvé'], 404);
    }

    $etudiant->delete();

    return response()->json(['message' => 'Étudiant supprimé']);
}
}