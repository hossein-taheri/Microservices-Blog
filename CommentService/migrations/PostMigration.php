<?php

namespace Migration;

class PostMigration
{
    public static function create()
    {
        $pdo = $GLOBALS['pdo'];
        $pdo->query("
            CREATE TABLE IF NOT EXISTS `posts`(
                `id` INT PRIMARY KEY AUTO_INCREMENT
            ); 	
        ");
    }
}
