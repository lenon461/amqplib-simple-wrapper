[![npm version](https://badge.fury.io/js/rabbitmq-simple-wrapper.svg)](https://badge.fury.io/js/rabbitmq-simple-wrapper)

# rabbitmq-simple-wrapper

This is a simple wrapper library to start rabbitmq quickly who use node.js.  
It supports only a few commands of amqplib library and helps to start easily rabbitmq.  

Install with: 
```
npm install rabbitmq-simple-wrapper
```

# Usage Example

```
const RabbitmqWrapper = require('../index');

const url = 'amqp://user:bitnami@192.168.90.200:5672';
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
```
* Note that the URL should change to yours  


  
    
      
  
# Test this example code

```
node example/
```
This will display:
```
$ node example/
Hello World is sent
"Hello World" is received
```
[how to use? (kr)](https://velog.io/@ljs/RabbitMQ-quickstart-in-Node.js-y3k4dpf59j)
