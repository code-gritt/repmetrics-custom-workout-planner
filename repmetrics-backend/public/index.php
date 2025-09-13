<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

require __DIR__ . '/../vendor/autoload.php';

/** @var Application $app */
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Make sure the app is bootstrapped (Facades & router)
$app->make(Illuminate\Contracts\Http\Kernel::class)->bootstrap();

$router = $app['router'];
$router->group([], function () use ($router) {
    require __DIR__ . '/../routes/api.php';
});

// Handle request
$request = Request::capture();
$response = $app->handle($request);
$response->send();
$app->terminate($request, $response);
