import type { NextFunction } from "express";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import { Order } from "../models/order.model.js";
export const newOrder = async (data: any) => {
  const order = await Order.create(data);

  return order;
};
