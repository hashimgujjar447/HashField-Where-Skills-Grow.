import { type Response } from "express";
import Course from "../models/course.model.js";

export const createCourse = async (data: any, res: Response) => {
  const course = await Course.create(data);
  res.status(201).json({
    success: true,
    message: "Course created successfully",
    course,
  });
};
