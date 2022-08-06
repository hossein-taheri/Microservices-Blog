const UserService = require("../services/UserService");
const amqp = require('amqplib/callback_api');
const host = process.env.RABBIT_MQ_HOST || '127.0.0.1';
const port = process.env.RABBIT_MQ_PORT || 5672;
const exchange_name = "blog"
const user_queue_name = "post_service_user"

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

                channel.consume(q.queue, async (msg) => {
                    if (msg.content) {
                        msg.content = JSON.parse(msg.content.toString());

                        await UserService.create(
                            msg.content.id,
                            msg.content.first_name,
                            msg.content.last_name
                        );
                    }
                }, {
                    noAck: true
                });
            });
    });

});