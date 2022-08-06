const ProducerService = (connection, exchange_name, producers) => {
    connection.createChannel((channel_err, channel) => {
        if (channel_err) {
            throw channel_err;
        }
        channel.assertExchange(exchange_name, 'direct', {
            durable: true
        });

        producers.sendMessageToQueue = (routing_key, message) => {
            try {
                channel.publish(exchange_name, routing_key, Buffer.from(JSON.stringify(message)));
            } catch (err) {
                console.log(err)
            }
        }
    });
}

module.exports = ProducerService
