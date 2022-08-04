<?php

namespace Repository;

use Helpers\PDOHelper;

class PostRepository
{
    public static function findOneById($post_id)
    {
        $pdo = $GLOBALS['pdo'];
        $query = "
            SELECT posts.id, title, description, first_name , last_name 
            FROM posts,users
            WHERE
            posts.id = :id AND posts.user_id = users.id
        ";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":id", $post_id);
        $statement->execute();
        return $statement->fetchAll()[0];
    }

    public static function findAll($per_page, $page)
    {
        $offset = $per_page * ($page - 1);
        $pdo = $GLOBALS['pdo'];
        $query = "
            SELECT posts.id, posts.title, posts.short_description, users.first_name , users.last_name 
            FROM posts,users
            WHERE
            posts.user_id = users.id
            LIMIT $per_page
            OFFSET $offset
           ";
        $statement = $pdo->prepare($query);
        $statement->execute();
        return $statement->fetchAll();
    }

    public static function findLastInserted()
    {
        $pdo = $GLOBALS['pdo'];
        $query = "SELECT * FROM `posts` WHERE `id` = LAST_INSERT_ID();";
        $statement = $pdo->prepare($query);
        PDOHelper::execute($statement);
        return $statement->fetchAll()[0];
    }

    public static function create($title, $short_description, $description, $user_id)
    {
        $pdo = $GLOBALS['pdo'];
        $query = "INSERT INTO `posts`(`title`, `short_description`,`description` , `user_id`) VALUES (:title,:short_description,:description,:user_id)";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':title', $title);
        $statement->bindParam(':description', $description);
        $statement->bindParam(':short_description', $short_description);
        $statement->bindParam(':user_id', $user_id);
        PDOHelper::execute($statement);
        return $statement->fetchAll();
    }

}

