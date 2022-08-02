<?php

try {
    $db = $GLOBALS['config']['database'];

    try {
        $pdo = new PDO(
            "{$db['connection']};",
            $db['username'],
            $db['password'],
        );
        $pdo->query("CREATE DATABASE IF NOT EXISTS " . $db['dbname']);
        $pdo->query("use " . $db['dbname']);
        $GLOBALS['pdo'] = $pdo;
    } catch (Exception $err){
        echo $err->getMessage();
    }
} catch (PDOException $e) {
    die("Couldn't connect to DB::" . $e->getMessage() . "\n");
}

