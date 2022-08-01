<?php

namespace Migration;

class PostMigration
{
    public static function create()
    {
        $pdo = $GLOBALS['pdo'];
        $pdo->query("
            CREATE TABLE IF NOT EXISTS `posts`(
                `id` INT PRIMARY KEY AUTO_INCREMENT,
                `title` VARCHAR(50) NOT NULL,     
                `short_description` VARCHAR(51) NOT NULL,
                `description` TEXT NOT NULL,
    			`user_id` INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            ); 	
        ");
    }
}
