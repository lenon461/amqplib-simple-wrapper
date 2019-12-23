const amqp = require('amqplib/callback_api');

const url = 'amqp://user:bitnami@192.168.90.200:5672';
const queueName = 'MQ_test';

amqp.connect(url, function(error, connect) {
    if (error) {
        console.log(error);
        return;
    }
    connect.createChannel(function(error, channel) {
        if (error) {
            console.log(error);
            return;
        }
        channel.assertQueue(queueName, {durable: false}, function(error) {
            const recevieMessage = function() {
                channel.get(queueName, {}, function(error, message) {
                    if (error) {
                        console.log(error);
                    } else if (message) {
                        console.log(message.content.toString());
                        channel.ack(message);
                        setTimeout(recevieMessage, 1000);
                    } else {
                        console.log('NO MESSAGE');
                        setTimeout(recevieMessage, 1000);
                    }
                });
            };
            recevieMessage();
        });
    });
});
