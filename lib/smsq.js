"use strict";
const amqp = require('amqplib');
class SMSQ {
    constructor() {
        this.log = 'a';
        this.print();
    }
    print() {
        console.log('hi');
    }
}
const smsq = new SMSQ();
