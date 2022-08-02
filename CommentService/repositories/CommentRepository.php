<?php

namespace Repository;

use Helpers\PDOHelper;

class CommentRepository
{
    public static function findAllByPostId($post_id)
    {
        $pdo = $GLOBALS['pdo'];
        $query = "
            SELECT comments.body , users.first_name , users.last_name
            FROM comments,users
            WHERE
            comments.post_id = :post_id
                AND
            comments.user_id = users.id 
        ";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":post_id", $post_id);
        $statement->execute();
        return $statement->fetchAll()[0];
    }


    public static function create($body, $post_id, $user_id)
    {
        $pdo = $GLOBALS['pdo'];
        $query = "INSERT INTO `comments`(`body`,`post_id`,`user_id`) VALUES (:body,:post_id,:user_id)";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':body', $body);
        $statement->bindParam(':post_id', $post_id);
        $statement->bindParam(':user_id', $user_id);
        PDOHelper::execute($statement);
        return $statement->fetchAll();
    }

}

