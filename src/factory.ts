import amqp from 'amqplib'

class RabbitmqFactory {

    _url: string;
    _queueName: string;
    _options: object;
    channel: undefined;
    queue: undefined;

    constructor(url: string, queueName: string, options: object) {
        this._url = url;
        this._queueName = queueName;
        this._options = options || {};

        // public
        this.channel = undefined;
        this.queue = undefined;
    }
}
