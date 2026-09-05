import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import { redis } from "../utils/redis.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { asyncErrorHandler } from "./catchAsyncErrors.js";

export const isAuthenticated = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access this resource", 401),
      );
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN as Secret,
      ) as JwtPayload;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Access token has expired. Please refresh your token.",
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Access token is invalid.",
        });
      }

      return next(error);
    }

    if (!decoded.id) {
      return next(new ErrorHandler("Access token is not valid", 401));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found please login again", 401));
    }

    req.user = JSON.parse(user);

    next();
  },
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req?.user?.role} is not allowed to access this resource`,
          403,
        ),
      );
    }

    next();
  };
};
