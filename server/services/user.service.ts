import type { Response } from "express";
import { redis } from "../utils/redis.js";
import User from "../models/user.model.js";
export const getUserById = async (id: string, res: Response) => {
  const user = await redis.get(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user: JSON.parse(user),
  });
};

export const getAllUsers = async (res: Response) => {
  const users = await User.find().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    users,
  });
};
