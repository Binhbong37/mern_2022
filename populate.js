import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './model/Job.js';

const start = async () => {
    const URL_MONGODB = 'mongodb://localhost:27017/mern_2022';
    try {
        await connectDB(URL_MONGODB);
        await Job.deleteMany();

        const jsonProducts = JSON.parse(
            await readFile(new URL('./mock-data.json', import.meta.url))
        );
        await Job.create(jsonProducts);
        console.log('Success');
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();
