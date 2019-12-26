const RabbitmqWrapper = require('../index');

const url = 'amqp://user:bitnami@192.168.90.200:56721';
const queueName = 'MQ_test';
const rq = new RabbitmqWrapper(url, queueName);
const message = "Hello World";

async function main() {

    await send_a_message();
    await recv_a_message();
    await process.exit(1);
}

main();

async function send_a_message() {

    await rq.setup();
    await rq.assertQueue();
    await rq.sendToQueue(message);
    console.log(message + ' is sent')

}
async function recv_a_message() {

    await rq.setup();
    const msg = await rq.recvFromQueue();
    console.log(msg + ' is received')

}