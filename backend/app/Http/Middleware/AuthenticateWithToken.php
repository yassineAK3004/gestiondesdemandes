<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthenticateWithToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        // ❌ À remplacer par une vraie vérification quand tu auras une table tokens
        if ($token !== 'ton_token_secret') {
            return response()->json(['error' => 'Accès interdit'], 401);
        }

        return $next($request);
    }
}