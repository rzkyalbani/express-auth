import dotenv from 'dotenv';
import { ExpiresIn } from '../types/authType';
import { CookieOptions } from 'express';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || '',
    env: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.JWT_SECRET as string,
        expiresIn: process.env.JWT_EXPIRES_IN as ExpiresIn,
    },
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    } as CookieOptions,
};
