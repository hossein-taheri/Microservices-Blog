const amqp = require('amqplib/callback_api');
const host = process.env.RABBIT_MQ_HOST || '127.0.0.1';
const port = process.env.RABBIT_MQ_PORT || 5672;
const exchange_name = "blog"

const producers = {}

amqp.connect(`amqp://${host}:${port}`, (connection_err, connection) => {
    if (connection_err) {
        process.exit(-1);
        throw connection_err;
    }

    require("./services/ConsumerService")(connection, exchange_name);

});

module.exports = producers