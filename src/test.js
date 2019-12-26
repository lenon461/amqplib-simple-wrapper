const amqp = require('amqplib');

class SMSQ {
    constructor(url, queueName, options) {
        this._url = url;
        this._queueName = queueName;
        this._options = options || {durable: false};

        // public
        this.connect = undefined;
        this.channel = undefined;
        this.queue = undefined;
    }
    async setup() {
        const connect = await amqp.connect(this._url);
        this.connect = connect;

        const channel = await connect.createChannel(); 
        this.channel = channel;

        const queue = await channel.assertQueue(this._queueName, this._options);
        this.queue = queue;

    }
    async send(message, message_options) {
        const _message_options = message_options || {persistent: true}
        function encode(doc) {
            return Buffer.from(JSON.stringify(doc));
        } 
        await this.channel.sendToQueue(this._queueName, encode(message), _message_options);
        // this.connect.close();
    }
    async recv(message_options) {
        const _message_options = message_options || {noAck: true}
        const messages = []
        const message = await this.channel.consume(this._queueName, (msg) => {
            console.log("msg");
            console.log(msg);
            messages.push(msg.content.toString());
        })
        // this.connect.close();
        return messages;
    }
    async pop(message_options) {
        const _message_options = message_options || {noAck: true}
        const message = await this.channel.get(this._queueName, _message_options);
        return message.content.toString();

    }
}


const url = 'amqp://user:bitnami@192.168.90.200:5672';
const queueName = 'MQ_test';
const rq = new SMSQ(url, queueName);

async function main() {
    const rq = new SMSQ(url, queueName);
    await rq.setup();
    // await rq.send('hi2')
    // const result = await rq.pop();
    const result = await rq.recv();

    // console.log(result);

    // process.exit(0);
}

main();