const UserService = require("../../services/UserService");
const PostService = require("../../services/PostService");

const user_queue_name = "comment_service_user"
const post_queue_name = "comment_service_post"


const ConsumerService = (connection, exchange_name) => {
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

                        UserService.create(
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
                        PostService.create(
                            msg.content.id
                        );
                    }
                }, {
                    noAck: true
                });
            });

    });
}

module.exports = ConsumerService;