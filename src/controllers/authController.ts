import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";
import { LoginUserRequest, RegisterUserRequest } from "../types/authType";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
): Promise<void> => {
  const body = req.body as LoginUserRequest;

  try {
    const {};
  } catch (err) {}
};
