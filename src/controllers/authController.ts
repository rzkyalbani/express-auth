import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { RegisterUserRequest } from "../types/authType";

export const registerHandler = async (req: Request, res: Response) => {
    const body = req.body as RegisterUserRequest;

    try {
        const user = await AuthService.register(body);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}