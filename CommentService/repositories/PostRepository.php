<?php

namespace Repository;

use Helpers\PDOHelper;

class PostRepository
{
    public static function findOneById($post_id)
    {
        $pdo = $GLOBALS['pdo'];
        $query = "
            SELECT id
            FROM posts
            WHERE
            posts.id = :id
        ";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":id", $post_id);
        $statement->execute();
        return $statement->fetchAll()[0];
    }


    public static function create($id)
    {
        $pdo = $GLOBALS['pdo'];
        $query = "INSERT INTO `posts`(`id`) VALUES (:id)";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':id', $id);
        PDOHelper::execute($statement);
        return $statement->fetchAll();
    }

}

