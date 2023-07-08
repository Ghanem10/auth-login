import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './connect.js';
import authorizeMiddleWare from './middleware.js';
import auth from './auth.js';
import cors from 'cors';

config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/auth/41v", auth);
app.use("/page/41v", auth, authorizeMiddleWare);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.log("internal error: ", error);
    }
}

start();