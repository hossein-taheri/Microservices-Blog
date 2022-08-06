const UserService = require("../../services/UserService");
const user_queue_name = "post_service_user"


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
}

module.exports = ConsumerService;