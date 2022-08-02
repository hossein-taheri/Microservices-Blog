<?php

namespace Controllers;

require_once "helpers/Exceptions.php";
require_once "repositories/PostRepository.php";
require_once "repositories/UserRepository.php";
require_once "repositories/CommentRepository.php";


use Helpers\Response;
use NotFoundException;
use Repository\CommentRepository;
use Repository\PostRepository;
use Repository\UserRepository;


class CommentController
{
    public function create($post_id)
    {
        $user = UserRepository::findOneByObjectId($_POST['user_id']);

        if (!$user) {
            throw new NotFoundException("User not found");
        }

        $post = PostRepository::findOneById($post_id);

        if (!$post) {
            throw new NotFoundException("Post not found");
        }

        $post = CommentRepository::create($_POST['body'],$post_id,$user['id']);

        return Response::message(
            null,
            $post
        );
    }
}
