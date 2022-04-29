import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const URL_API = process.env.URL_API!;

export async function getUsers() {
    const resp = await axios.get(URL_API);
    return resp.data;
}

export async function getOneUser(index: number) {
    const resp = await axios.get(URL_API);
    return resp.data[index];
}