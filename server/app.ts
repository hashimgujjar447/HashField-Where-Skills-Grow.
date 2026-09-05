import dotenv from "dotenv";
dotenv.config();
import express, {
  type NextFunction,
  type Request,
  type Response,
  urlencoded,
} from "express";

export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error.js";

// importing routers

import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import orderRouter from "./routes/order.route.js";
import notificationRouter from "./routes/notification.route.js";
import analyticsRouter from "./routes/analytics.route.js";
import layoutRouter from "./routes/layout.route.js";

// body parser

app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ extended: true }));

// cookie parser

app.use(cookieParser());

// Cors

app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", notificationRouter);
app.use("/api/v1", analyticsRouter);
app.use("/api/v1", layoutRouter);
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Api is working",
    success: true,
  });
});

app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
