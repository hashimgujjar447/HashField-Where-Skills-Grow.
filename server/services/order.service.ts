import type { NextFunction, Response } from "express";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import { Order } from "../models/order.model.js";
export const newOrder = async (data: any) => {
  const order = await Order.create(data);

  return order;
};

export const getOrders = async (res: Response) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    orders,
  });
};
