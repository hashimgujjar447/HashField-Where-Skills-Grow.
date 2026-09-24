import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import { redis } from "../utils/redis.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { asyncErrorHandler } from "./catchAsyncErrors.js";
import type { IUser } from "../models/user.model.js";

const refreshAndContinue = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  let refreshDecoded: JwtPayload;
  try {
    refreshDecoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN as Secret,
    ) as JwtPayload;
  } catch {
    return next(new ErrorHandler("Refresh token is invalid or expired. Please login again.", 401));
  }

  if (!refreshDecoded.id) {
    return next(new ErrorHandler("Refresh token is not valid", 401));
  }

  const session = await redis.get(refreshDecoded.id as string);
  if (!session) {
    return next(new ErrorHandler("Session expired. Please login again.", 401));
  }

  const user = JSON.parse(session) as IUser;

  const newAccessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN as Secret,
    { expiresIn: "5m" },
  );

  const newRefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN as Secret,
    { expiresIn: "3d" },
  );

  const accessTokenExpiry = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
  const refreshTokenExpiry = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    expires: new Date(Date.now() + accessTokenExpiry * 60 * 60 * 1000),
    maxAge: accessTokenExpiry * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    expires: new Date(Date.now() + refreshTokenExpiry * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpiry * 24 * 60 * 60 * 1000,
  });

  await redis.set(user._id.toString(), JSON.stringify(user), "EX", 604800);

  req.user = user;
  next();
};

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
        return refreshAndContinue(req, res, next);
      }

      if (error.name === "JsonWebTokenError") {
        return next(new ErrorHandler("Access token is invalid.", 401));
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
