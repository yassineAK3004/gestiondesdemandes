<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'role_id'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token'
    ];

    // Relation : chaque utilisateur a un rôle
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    // Relation : un utilisateur peut avoir plusieurs demandes
    public function demandes()
    {
        return $this->hasMany(Demande::class, 'utilisateur_id');
    }
}