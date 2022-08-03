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
    public static function findOneByObjectId($object_id){
        $pdo = $GLOBALS['pdo'];
        $query = "SELECT * FROM `users` WHERE object_id=:object_id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":object_id", $object_id);
        $statement->execute();
        return $statement->fetchAll()[0];
    }
}
