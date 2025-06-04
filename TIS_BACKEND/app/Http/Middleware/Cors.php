<?php
// app/Http/Middleware/Cors.php
namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization, X-Requested-With');
        
        return $response;
    }
}

// Para registrar este middleware, edita app/Http/Kernel.php y añade:
// protected $middleware = [
//     // ...
//     \App\Http\Middleware\Cors::class,
// ];

// Alternativa: Configura el middleware CORS existente de Laravel en config/cors.php:
/*
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
*/