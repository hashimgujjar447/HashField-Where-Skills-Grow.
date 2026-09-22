import { type IOrder } from "../models/order.model.js";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import sendMail from "../utils/sendMail.js";
import Course from "../models/course.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { getOrders, newOrder } from "../services/order.service.js";
import { Notification } from "../models/notification.model.js";

import Stripe from "stripe";
import { redis } from "../utils/redis.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, payment_info } = req.body as IOrder;

    if (payment_info) {
      if ("id" in payment_info) {
        const paymentIntentId = payment_info.id as string;
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not successful", 400));
        }
      }
    }

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

    await Course.findByIdAndUpdate(courseId, {
      $inc: { purchased: 1 },
    });
    course.purchased = (course.purchased || 0) + 1;
    await redis.del(courseId.toString());
    await redis.del("allCourses");

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

    await redis.set(
      user._id.toString(),
      JSON.stringify({ ...user.toObject(), password: undefined }),
    );

    await user.save();

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

export const getAllOrders = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getOrders(res);
    } catch (error) {
      return next(new ErrorHandler("Failed to get all orders", 500));
    }
  },
);

export const sendStripePublishableKey = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

    return res.status(200).json({
      success: true,
      stripePublishableKey,
    });
  },
);

export const newPayment = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return next(new ErrorHandler("Invalid payment amount", 400));
      }

      const myPayment = await stripe.paymentIntents.create({
        amount,
        currency: "usd",

        metadata: {
          company: "LMS",
        },

        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch {
      return next(new ErrorHandler("Failed to process payment", 500));
    }
  },
);
