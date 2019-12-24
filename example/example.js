exports.send_a_message = async function (rq){
    await rq.setup();
    await rq.assertQueue();
    await rq.sendToQueue('Hello World');
    console.log('Hello World is sent')
}
exports.recv_a_message = async function (rq){
    await rq.setup();
    const msg = await rq.recvFromQueue();
    console.log(msg + ' is received')
}