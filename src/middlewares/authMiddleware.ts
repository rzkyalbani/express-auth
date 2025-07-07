import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { config } from '../config/config';
import { ResponseError } from '../errors/responseError';

export interface AuthRequest extends Request {
    userId?: string;
}

export const verifyJWT = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next(new ResponseError(401, 'Unauthorized: No token provided'));
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as {
            userId: string;
        };
        req.userId = decoded.userId;
        next();
    } catch (err) {
        next(err);
    }
};
