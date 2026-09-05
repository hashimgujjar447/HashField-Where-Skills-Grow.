import { type Response } from "express";
import type { IUser } from "../models/user.model.js";
import { redis } from "./redis.js";

export interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response,
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  await redis.set(
    user._id.toString(),
    JSON.stringify({ ...user.toObject(), password: undefined }),
  );

  const accessTokenExpiry = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10,
  );

  const refreshTokenExpiry = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10,
  );

  const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpiry * 60 * 60 * 1000),
    maxAge: accessTokenExpiry * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpiry * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpiry * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("accessToken", accessToken, accessTokenOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  return res.status(statusCode).json({
    success: true,
    user: {
      ...user.toObject(),
      password: undefined,
    },
    accessToken,
  });
};
