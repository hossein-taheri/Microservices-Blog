const UserController = require("../controllers/UserController")
const PostController = require("../controllers/PostController")

const amqp = require('amqplib/callback_api');
const host = process.env.RABBIT_MQ_HOST || '127.0.0.1';
const port = process.env.RABBIT_MQ_PORT || 5672;
const exchange_name = "blog"
const user_queue_name = "comment_service_user"
const post_queue_name = "comment_service_post"

const MessageBroker = {}

amqp.connect(`amqp://${host}:${port}`, (connection_err, connection) => {
    if (connection_err) {
        process.exit(-1);
        throw connection_err;
    }
    connection.createChannel((channel_err, channel) => {
        if (channel_err) {
            throw channel_err;
        }
        channel.assertExchange(exchange_name, 'direct', {
            durable: true
        });

        channel.assertQueue(
            user_queue_name,
            {
                exclusive: true
            },
            (queue_err, q) => {
                if (queue_err) {
                    throw queue_err;
                }
                console.log("Listening to RabbitMQ ...");

                channel.bindQueue(q.queue, exchange_name, 'user.created');

                channel.consume(q.queue, (msg) => {
                    if (msg.content) {
                        msg.content = JSON.parse(msg.content.toString());

                        UserController.create(
                            msg.content.id,
                            msg.content.first_name,
                            msg.content.last_name
                        );
                    }
                }, {
                    noAck: true
                });
            });

        channel.assertQueue(
            post_queue_name,
            {
                exclusive: true
            },
            (queue_err, q) => {
                if (queue_err) {
                    throw queue_err;
                }
                console.log("Listening to RabbitMQ ...");

                channel.bindQueue(q.queue, exchange_name, 'post.created');

                channel.consume(q.queue, (msg) => {
                    if (msg.content) {
                        msg.content = JSON.parse(msg.content.toString());
                        PostController.create(
                            msg.content.id
                        );
                    }
                }, {
                    noAck: true
                });
            });

    });

});

module.exports = MessageBroker