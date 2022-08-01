<?php

if (!$_ENV['DB_DBNAME']){
    $_ENV['DB_DBNAME'] = "NewDatabase";
}
if (!$_ENV['DB_USERNAME']){
    $_ENV['DB_USERNAME'] = "user";
}
if (!$_ENV['DB_PASSWORD']){
    $_ENV['DB_PASSWORD'] = "password";
}
if (!$_ENV['JWT_SECRET_KEY']){
    $_ENV['JWT_SECRET_KEY'] = "example_secret_key";
}


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