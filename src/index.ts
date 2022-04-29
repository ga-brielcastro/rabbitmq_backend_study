import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(router);

app.listen(PORT, () => {
    console.log('Express is running in localhost:' + PORT);
});
