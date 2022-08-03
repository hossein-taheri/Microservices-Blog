const amqp = require('amqplib/callback_api');
const host = process.env.RABBIT_MQ_HOST || '127.0.0.1';
const port = process.env.RABBIT_MQ_PORT || 5672;
const exchange_name = "blog"

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

        MessageBroker.sendMessageToQueue = (routing_key, message) => {
            try {
                channel.publish(exchange_name, routing_key, Buffer.from(JSON.stringify(message)));
            } catch (err) {
                console.log(err)
            }
        }
    });

});

module.exports = MessageBroker