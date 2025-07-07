import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/authService';
import {
    LoginUserRequest,
    RegisterUserRequest,
    UserResponse,
} from '../types/authType';
import { config } from '../config/config';
import { AuthRequest } from '../middlewares/authMiddleware';
import { User } from '../models/userModel';
import { ResponseError } from '../errors/responseError';

export const registerHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const body = req.body as RegisterUserRequest;

    try {
        const user = await AuthService.register(body);
        res.status(201).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const loginHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const body = req.body as LoginUserRequest;

    try {
        const { user, token } = await AuthService.login(body);

        res.cookie('jwt', token, {
            ...config.cookieOptions,
            maxAge: 24 * 60 * 60 * 3600,
        })
            .status(200)
            .json({ user });
    } catch (err) {
        next(err);
    }
};

export const logoutHandler = (req: Request, res: Response): void => {
    res.clearCookie('jwt', config.cookieOptions)
        .status(200)
        .json({ message: 'Logout successful' });
};

export const getMeHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            throw new ResponseError(404, 'User not found');
        }

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        next(err);
    }
};
