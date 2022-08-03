<?php
require 'vendor/autoload.php';
require 'manage-project/config.php';
require 'bootstrap/config.php';
require 'bootstrap/database.php';
require 'helpers/RabbitMQ.php';
require 'repositories/UserRepository.php';

use Repository\UserRepository;


function createUsers()
{
    error_log("Listening to RabbitMQ ...");

    $callback = function ($msg) {
        $msg->body = json_decode($msg->body);
        UserRepository::create($msg->body->id, $msg->body->first_name, $msg->body->last_name);
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
        "comment_service.users",
        "user.created"
    );
    RabbitMQ::consumingMessagesFromQueue(
        $channel,
        "comment_service.users",
        $callback
    );
    RabbitMQ::closeConnection(
        $connection
    );

}


sleep(10);
createUsers();