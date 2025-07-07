import mongoose from 'mongoose';

import { config } from './config';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed');
    }
};
