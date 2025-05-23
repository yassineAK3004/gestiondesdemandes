<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Demande;

class DemandeController extends \Illuminate\Routing\Controller
{
    // Soumettre une demande
     public function store(Request $request)
{
    $request->validate([
        'type' => 'required|string|max:255',
        'description' => 'required|string',
        'fichier' => 'nullable|string',
        'utilisateur_id' => 'required|exists:utilisateurs,id'
    ]);

    $demande = Demande::create([
        'utilisateur_id' => $request->utilisateur_id, // ✅ Corrigé
        'type' => $request->type,
        'description' => $request->description,
        'fichier' => $request->fichier ?? null,
        'statut' => 'en_attente'
    ]);

    return response()->json($demande, 201);
}

    // Lire toutes les demandes
    public function index()
    {
        return response()->json(Demande::with('utilisateur')->get());
    }

    // Mettre à jour le statut d'une demande
    public function updateStatut(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:en_attente,traitee'
        ]);

        $demande = Demande::find($id);

        if (!$demande) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }

        $demande->update(['statut' => $request->statut]);

        return response()->json(['message' => 'Statut mis à jour']);
    }

    public function updateFichier(Request $request, $id)
{
    // ✅ Valide le fichier
    $request->validate([
        'fichier' => 'required|file|mimes:pdf,jpeg,png|max:2048'
    ]);

    // ✅ Trouve la demande
    $demande = Demande::find($id);

    if (!$demande) {
        return response()->json(['message' => 'Demande non trouvée'], 404);
    }

    // ✅ Stocke le fichier dans storage/app/public/fichiers_demandes
    $chemin = $request->file('fichier')->store("demandes/{$id}", 'public');

    // ✅ Met à jour le champ fichier dans la base
    $demande->update([
        'fichier' => $chemin
    ]);

    return response()->json([
        'message' => 'Fichier mis à jour',
        'fichier' => $chemin
    ]);
}

 public function destroy($id)
{
    $demande = Demande::find($id);
    if (!$demande) {
        return response()->json(['message' => 'Demande non trouvée'], 404);
    }

    // Suppression directe sans vérifier l'utilisateur (temporaire, NON recommandé en prod)
    $demande->delete();

    return response()->json(['message' => 'Demande supprimée']);
}



}