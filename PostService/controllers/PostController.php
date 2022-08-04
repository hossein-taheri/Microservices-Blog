<?php

namespace Controllers;

require_once "helpers/Exceptions.php";
require_once "helpers/RabbitMQ.php";
require_once "repositories/PostRepository.php";
require_once "repositories/UserRepository.php";


use Helpers\Response;
use NotFoundException;
use RabbitMQ;
use Repository\PostRepository;
use Repository\UserRepository;


class PostController
{
    public function index()
    {
        $page = $_GET['page'];

        if (!$page) {
            $page = 1;
        }

        $per_page = 10;

        $posts = PostRepository::findAll($per_page, $page);

        return Response::message(
            null,
            $posts
        );
    }

    public function show($id)
    {
        $post = PostRepository::findOneById($id);

        if (!$post) {
            throw new NotFoundException("Post not found");
        }

        return Response::message(
            null,
            $post
        );
    }

    public function create()
    {
        $user = UserRepository::findOneByObjectId($_POST['user_id']);

        if (!$user) {
            throw new NotFoundException("User not found");
        }

        $short_description = substr($_POST['description'], 0, 50);

        $post = PostRepository::create($_POST['title'], $short_description, $_POST['description'], $user["id"]);

        $post = PostRepository::findLastInserted();

        RabbitMQ::producingMessage(
            'rabbitmq',
            5672,
            'guest',
            'guest',
            'blog',
            'direct',
            'post.created',
            json_encode($post)
        );

        return Response::message(
            null,
            $post
        );
    }
}
