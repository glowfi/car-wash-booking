import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRouter from './routes/users.js';
import adminRouter from './routes/admin.js';

const app = express();
import cors from 'cors';
app.use(
    cors({
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: ['http://localhost:3000']
    })
);
dotenv.config();

const conn = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log('Connected to DB...');
        })
        .catch((err) => {
            console.log('Error', err);
        });
};

app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.listen(8000, () => {
    conn();
    console.log('Running ...');
});
