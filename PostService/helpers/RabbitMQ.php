<?php

use PhpAmqpLib\Connection\AMQPStreamConnection;


class RabbitMQ
{
    public static function createConnection($host, $port, $username, $password)
    {
        return new AMQPStreamConnection($host, $port, $username, $password);
    }

    public static function createChannel($connection)
    {
        return $connection->channel();
    }

    public static function declareExchange($channel, $exchange_name, $type)
    {
        $channel->exchange_declare($exchange_name, $type, false, true, false);
    }

    public static function declareQueueAndBindToChannel($channel, $exchange_name, $queue_name, $routing_key)
    {
        $channel->queue_declare($queue_name, false, true, false, false);
        $channel->queue_bind($queue_name, $exchange_name, $routing_key);
    }

    public static function consumingMessagesFromQueue($channel, $queue_name, $callback)
    {
        $channel->basic_consume($queue_name, '', false, true, false, false, $callback);

        while ($channel->is_open()) {
            $channel->wait();
        }

        $channel->close();
    }

    public static function closeConnection($connection)
    {
        $connection->close();
    }
}


