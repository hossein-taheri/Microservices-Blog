<?php

$GLOBALS['config'] =  [
    'database' => [
        'connection' => "mysql:host=" . $_ENV['DB_HOST'] ,
        'username' => $_ENV['DB_USERNAME'],
        'password' => $_ENV['DB_PASSWORD'],
        'dbname' => $_ENV['DB_DBNAME'],
    ],
    'keys' => [
        'JWT' => $_ENV['JWT_SECRET_KEY'],
    ],
];