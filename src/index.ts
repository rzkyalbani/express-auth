import cookieParser from 'cookie-parser';
import express from 'express';

import mainRouter from './routes/index';
import { connectDB } from './config/db';
import { config } from './config/config';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // To parse cookies from request easily

// Router
app.use('/api/v1', mainRouter);

// Error Handler
app.use(errorHandler);

connectDB().then(() => {
    app.listen(config.port, () => {
        console.log(`Server running at http://localhost:${config.port}`);
    });
});
