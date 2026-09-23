import { Notification } from "../models/notification.model.js";
import type { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cron from "node-cron";

export const getNotifications = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const updateNotificationStatus = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new ErrorHandler("Notification ID is required", 400));
      }

      const notification = await Notification.findById(id);

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      }

      notification.status
        ? (notification.status = "read")
        : notification.status;

      await notification.save();

      const notifications = await Notification.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
export const markAllNotificationsAsRead = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Notification.updateMany(
      { status: "unread" },
      { $set: { status: "read" } },
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  },
);

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: {
      $lt: thirtyDaysAgo,
    },
  });
});
