import type { NextFunction, Request, Response } from "express";

export const asyncErrorHandler =
  (theFunc: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      theFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
