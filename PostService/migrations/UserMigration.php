<?php

namespace Migration;

class UserMigration
{
    public static function create()
    {
        $pdo = $GLOBALS['pdo'];
        $pdo->query("
            CREATE TABLE IF NOT EXISTS `users`(
                `id` INT PRIMARY KEY AUTO_INCREMENT,
                `object_id` VARCHAR(25) NOT NULL,     
                `first_name` VARCHAR(250) NOT NULL,     
                `last_name` VARCHAR(250) NOT NULL
            );
        ");
    }
}
