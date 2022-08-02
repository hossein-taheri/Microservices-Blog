<?php

namespace Migration;

class CommentMigration
{
    public static function create()
    {
        $pdo = $GLOBALS['pdo'];
        $pdo->query("
            CREATE TABLE IF NOT EXISTS `comments`(
                `id` INT PRIMARY KEY AUTO_INCREMENT,
                `body` VARCHAR(255) NOT NULL,
    			`post_id` INT NOT NULL,
    			`user_id` INT NOT NULL,
                FOREIGN KEY (post_id) REFERENCES posts(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        ");
    }
}
