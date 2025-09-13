<?php

/** @var \Illuminate\Routing\Router $router */

use App\Http\Controllers\AuthController;

$router->post('/register', [AuthController::class, 'register']);
$router->post('/login', [AuthController::class, 'login']);

$router->get('/me', [
  'middleware' => 'auth:sanctum',
  'uses' => [AuthController::class, 'me']
]);
