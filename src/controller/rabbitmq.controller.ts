import * as dotenv from 'dotenv';
dotenv.config({path: __dirname+'/.env'});

import * as amqp from 'amqplib';
import { getOneUser } from '../api/api';

const URL_AMQP_CONNECTION = process.env.URL_AMQP_CONNECTION!;
const QUEUE = process.env.QUEUE_AMQP!;


export async function createConnection() {
    // create connection and channel
    const connection = await amqp.connect(URL_AMQP_CONNECTION);
    return connection;
}

export async function createChannel(conn: any) {
    conn = createConnection();
    const channel = await conn.createChannel();
    return channel;
}

export async function sendQueue(queue: string, message: any) {
    try {
        // create connection and channel
        const connection = await amqp.connect(URL_AMQP_CONNECTION);
        const channel = await connection.createChannel();

        // check if the queue exists
        const existsQueue = await channel.assertQueue(queue);

        if (existsQueue) {
            // send message
            channel.sendToQueue(queue, Buffer.from(message));
        } else {
            console.log('Could not send message!');
        }
    } catch(err) {
        console.log(err);
    }
}

export async function run() {
    try {
        sendQueue(QUEUE, JSON.stringify(await getOneUser(5)));
    } catch(err) {
        console.log(err);
    }
}
