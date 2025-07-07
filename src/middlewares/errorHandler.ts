import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/responseError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ResponseError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: err.message,
    });
  }
};
