import { Request, Response, NextFunction } from "express";

export const TimeOneDate = 24 * 60 * 60 * 1000;

export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
