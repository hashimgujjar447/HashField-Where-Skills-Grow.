import { type IOrder } from "../models/order.model.js";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import sendMail from "../utils/sendMail.js";
import Course from "../models/course.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { newOrder } from "../services/order.service.js";
import { Notification } from "../models/notification.model.js";

export const createOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, payment_info } = req.body as IOrder;

    const user = await User.findById(req.user?._id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const courseExistInUser = user.courses.some(
      (course) => course.courseId.toString() === courseId.toString(),
    );

    if (courseExistInUser) {
      return next(new ErrorHandler("You have already purchased", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found.", 404));
    }

    const data = {
      courseId: course._id,
      userId: user._id,
      payment_info,
    };

    if (course.purchased) {
      course.purchased += 1;
    }

    await course.save();
    const order = await newOrder(data);

    const mailData = {
      name: user.name,
      order: {
        _id: order._id.toString().slice(0, 6),
        name: course.title,
        price: course.price,
        date: new Date().toLocaleDateString("en"),
      },
    };

    try {
      await sendMail({
        email: user.email,
        subject: "Order Confirmation",
        template: "order-confirmation.ejs",
        data: mailData,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }

    user.courses.push({ courseId: course?._id });

    await Notification.create({
      userId: user?._id,
      title: "New Order",
      message: `You have a new order from ${course?.title}`,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  },
);
