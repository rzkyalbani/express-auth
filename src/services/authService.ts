import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
    LoginUserRequest,
    RegisterUserRequest,
    UserResponse,
} from '../types/authType';
import { ResponseError } from '../errors/responseError';
import { IUser, User } from '../models/userModel';
import { config } from '../config/config';

export class AuthService {
    static async register(req: RegisterUserRequest): Promise<UserResponse> {
        const { username, email, password } = req;

        if (!username || !email || !password) {
            throw new ResponseError(400, 'All fields are required');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ResponseError(400, 'User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return {
            id: newUser.id.toString(),
            username: newUser.username,
            email: newUser.email,
        };
    }

    static async login(
        req: LoginUserRequest
    ): Promise<{ user: UserResponse; token: string }> {
        const { email, password } = req;

        const user = (await User.findOne({ email })) as IUser;
        if (!user) {
            throw new ResponseError(400, 'Email or Password invalid');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new ResponseError(400, 'Email or Password invalid');
        }

        const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });

        const userResponse: UserResponse = {
            id: user._id as string,
            username: user.username,
            email: user.email,
        };

        return { user: userResponse, token };
    }
}
