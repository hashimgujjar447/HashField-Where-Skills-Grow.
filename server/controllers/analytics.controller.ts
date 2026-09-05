import type { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { generateLast12MonthDate } from "../utils/analytics.js";
import User from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import Course from "../models/course.model.js";

export const getUsersAnalytics = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthDate(User);
      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  },
);

// order analytics

export const getOrdersAnalytics = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthDate(Order);
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  },
);

// course analytics

export const getCoursesAnalytics = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthDate(Course);
      return res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  },
);
