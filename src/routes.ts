import * as dotenv from 'dotenv';
import express from 'express';
const router = express.Router();
import { run } from './controller/rabbitmq.controller';

dotenv.config();

router.get('/', run);

export default router;