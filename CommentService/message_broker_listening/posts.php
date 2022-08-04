<?php
require 'vendor/autoload.php';
require 'manage-project/config.php';
require 'bootstrap/config.php';
require 'bootstrap/database.php';
require 'helpers/PDOHelper.php';
require 'helpers/RabbitMQ.php';
require 'repositories/PostRepository.php';

use Repository\PostRepository;


function createPosts()
{
    error_log("Listening to RabbitMQ ...");

    $callback = function ($msg) {
        $msg->body = json_decode($msg->body);
        PostRepository::create($msg->body->id);
    };

    $connection = RabbitMQ::createConnection(
        "rabbitmq",
        5672,
        "guest",
        "guest"
    );

    $channel = RabbitMQ::createChannel($connection);
    RabbitMQ::declareExchange(
        $channel,
        "blog",
        "direct"
    );
    RabbitMQ::declareQueueAndBindToChannel(
        $channel,
        "blog",
        "comment_service.posts",
        "post.created"
    );
    RabbitMQ::consumingMessagesFromQueue(
        $channel,
        "comment_service.posts",
        $callback
    );
    RabbitMQ::closeConnection(
        $connection
    );

}


sleep(10);
createPosts();