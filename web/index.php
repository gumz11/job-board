<?php 
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require('../vendor/autoload.php');
require('src/JobService.php');

$config = [
    'settings' => [
        'displayErrorDetails' => true
    ],
];

$app = new \Slim\App($config);

$app->get('/api/jobs', 'JobService');
$app->get('/[{path:.*}]', function (Request $request, Response $response, array $args) {
    return $response->getBody()->write(file_get_contents('ui/build/index.html'));
});


$app->run();