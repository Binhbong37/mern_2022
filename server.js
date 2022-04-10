import express, { json } from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobRoutes.js';

// middleware handler error
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const URL_MONGODB = 'mongodb://localhost:27017/mern_2022';
const start = async () => {
    try {
        await connectDB(URL_MONGODB);
        app.listen(port, () =>
            console.log(`Sever is running from port ${port}`)
        );
    } catch (error) {
        console.log(error);
    }
};
start();
