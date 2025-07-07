import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';

import mainRouter from './routes/index';

const app = express();

// Middleware 
app.use(express.json());
app.use(cookieParser()); // To parse cookies from request easily

// Router
app.use('/api/v1', mainRouter);

// Error Handler
app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Something went wrong'
    });
});

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/express-auth';

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.log('MongoDB connection error: ', err);
    });

