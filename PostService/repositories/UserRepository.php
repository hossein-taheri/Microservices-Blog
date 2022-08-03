<?php
namespace Repository;

use Helpers\PDOHelper;

class UserRepository {
    public static function findOneById($id){
        $pdo = $GLOBALS['pdo'];
        $query = "SELECT username,first_name,last_name,email,avatar,role,gender,phone FROM users WHERE id = :id AND is_confirmed = 1";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":id", $id);
        $statement->execute();
        return $statement->fetchAll()[0];
    }
    public static function create($object_id,$first_name,$last_name){
        echo json_encode([
            $object_id,
            $first_name,
            $last_name
        ]);
        $pdo = $GLOBALS['pdo'];
        $query = "
            INSERT INTO `users`(
                `object_id`, `first_name`, `last_name`
            ) VALUES (
                :object_id,:first_name,:last_name
            )";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":object_id", $object_id);
        $statement->bindParam(":first_name", $first_name);
        $statement->bindParam(":last_name", $last_name);
        $statement->execute();
        return $statement->fetchAll();
    }
    public static function findOneByObjectId($object_id){
        $pdo = $GLOBALS['pdo'];
        $query = "SELECT * FROM `users` WHERE object_id=:object_id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":object_id", $object_id);
        $statement->execute();
        return $statement->fetchAll()[0];
    }
}

