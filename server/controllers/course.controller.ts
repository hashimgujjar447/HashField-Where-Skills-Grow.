import type { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { createCourse, getCourses } from "../services/course.service.js";
import Course from "../models/course.model.js";
import { redis } from "../utils/redis.js";
import mongoose from "mongoose";
import path from "node:path";
import ejs from "ejs";
import sendMail from "../utils/sendMail.js";
import { Notification } from "../models/notification.model.js";

export const uploadCourse = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const thumbnail = data.thumbnail;

    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await createCourse(data, res);

    await redis.del("allCourses");
  },
);

export const editCourse = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    if (typeof courseId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const data = req.body;
    const thumbnail = data.thumbnail;

    if (thumbnail) {
      if (course.thumbnail?.public_id) {
        await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
      }

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: data },
      { new: true },
    );

    await redis.del(courseId);
    await redis.del("allCourses");

    return res.status(200).json({
      success: true,
      course: updatedCourse,
    });
  },
);

export const getSingleCourse = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    if (typeof courseId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    if (!courseId) {
      return next(new ErrorHandler("Course ID is required", 400));
    }

    const isCachedExist = await redis.get(courseId);

    if (isCachedExist) {
      return res.status(200).json({
        success: true,
        course: JSON.parse(isCachedExist),
      });
    }

    const course = await Course.findById(courseId).select(
      "-courseData.videoUrl -courseData.videoPlayer -courseData.videoLength -courseData.suggestions -courseData.questions -courseData.links",
    );

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    await redis.set(courseId, JSON.stringify(course), "EX", 604800);

    return res.status(200).json({
      success: true,
      course,
    });
  },
);

export const getAllCourses = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isCachedExist = await redis.get("allCourses");

    if (isCachedExist) {
      const courses = JSON.parse(isCachedExist);

      return res.status(200).json({
        success: true,
        courses,
      });
    }

    const courses = await Course.find().select(
      "-courseData.videoUrl -courseData.videoPlayer -courseData.videoLength -courseData.suggestions -courseData.questions -courseData.links",
    );

    await redis.set("allCourses", JSON.stringify(courses), "EX", 3600);

    return res.status(200).json({
      success: true,
      courses,
    });
  },
);

export const getCourseByUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;

    if (!courseId) {
      return next(new ErrorHandler("Course ID is required", 400));
    }

    console.log("User course list:", userCourseList);
    if (!userCourseList || userCourseList.length === 0) {
      return next(new ErrorHandler("You have not purchased any courses", 400));
    }

    const isCourseExist = userCourseList.find(
      (course) => course.courseId.toString() === courseId,
    );

    if (!isCourseExist) {
      return next(new ErrorHandler("Please purchase this course first", 403));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    return res.status(200).json({
      success: true,
      content: course.courseData,
    });
  },
);

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req?.user?.courses;
    const { question, contentId, courseId } = req.body as IAddQuestionData;
    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }

    const courseContent = course?.courseData.find((content) =>
      content._id.equals(contentId),
    );

    if (!courseContent) {
      return next(new ErrorHandler("Content not found", 404));
    }

    const newQuestion: any = {
      question: question,
      user: req.user?._id,
      questionReplies: [],
    };

    courseContent.questions.push(newQuestion);

    await Notification.create({
      title: "New Question Added",
      message: `${req.user?.name} has added a new question in ${courseContent.title}`,
      userId: req.user!._id,
    });
    await course.save();

    res.status(200).json({
      success: true,
      message: "Question added successfully",
    });
  },
);

interface IAddQuestionAnswerData {
  question: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addQuestionAnswer = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req.user?.courses;

    const { question, contentId, courseId, questionId } =
      req.body as IAddQuestionAnswerData;

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return next(new ErrorHandler("Invalid course ID", 400));
    }

    if (!contentId || !mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }

    if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
      return next(new ErrorHandler("Invalid question ID", 400));
    }

    if (!question) {
      return next(new ErrorHandler("Please provide an answer", 400));
    }

    // if (!userCourseList || userCourseList.length === 0) {
    //   return next(new ErrorHandler("You have not purchased any courses", 403));
    // }

    // const isCourseExist = userCourseList.find(
    //   (course) => course.courseId.toString() === courseId,
    // );

    // if (!isCourseExist) {
    //   return next(new ErrorHandler("Please purchase this course first", 403));
    // }

    const course = await Course.findById(courseId).populate(
      "courseData.questions.user",
    );

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const courseContent = course.courseData.find((content) =>
      content._id.equals(contentId),
    );

    if (!courseContent) {
      return next(new ErrorHandler("Content not found", 404));
    }

    const contentQuestion = courseContent.questions.find(
      (question) => question._id.toString() === questionId,
    );

    if (!contentQuestion) {
      return next(new ErrorHandler("Question not found", 404));
    }

    const reply: any = {
      comment: question,
      user: req.user!._id,
      commentReplies: [],
    };

    contentQuestion.questionReplies.push(reply);

    await course.save();

    const questionUser = contentQuestion.user as any;

    if (req.user!._id.toString() !== questionUser._id.toString()) {
      const data = {
        name: questionUser.name,
        title: courseContent.title,
      };

      await sendMail({
        email: questionUser.email,
        subject: "New reply to your question",
        template: "question-reply-email.ejs",
        data,
      });
    } else {
      await Notification.create({
        title: "New Reply Added",
        message: `${req.user?.name} has added a new reply to your question in ${courseContent.title}`,
        userId: req.user!._id,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reply added successfully",
    });
  },
);

interface IReviewData {
  review: string;
  rating: number;
}

export const addReview = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { review, rating } = req.body as IReviewData;
    const courses = req?.user?.courses;
    const userId = req?.user?._id.toString();
    const { courseId } = req.params;

    if (Array.isArray(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    if (
      !courseId ||
      courseId.trim() === "" ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return next(new ErrorHandler("Invalid course ID", 400));
    }
    if (!review || !rating) {
      return next(new ErrorHandler("Please provide review and rating", 400));
    }

    if (rating < 1 || rating > 5) {
      return next(new ErrorHandler("Rating must be between 1 and 5", 400));
    }
    if (!courses || courses.length === 0) {
      return next(new ErrorHandler("You have not purchased any courses", 403));
    }
    const isCourseExist = courses.some(
      (course) => course.courseId.toString() === courseId,
    );
    if (!isCourseExist) {
      return next(new ErrorHandler("Please purchase this course first", 403));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const newReview: any = {
      rating: rating,
      comment: review,
      user: userId,
    };

    course.reviews.push(newReview);

    let avg = 0;

    course.reviews.forEach((rev: any) => {
      avg += rev.rating;
    });

    course.ratings = avg / course.reviews.length;

    await course.save();

    await redis.del(courseId);
    await redis.del("allCourses");

    const notification = {
      title: "New Review Received",
      message: `${req.user?.name} is given a review on ${course.title}`,
    };

    // create notification
    await Notification.create({
      ...notification,
      userId: req.user!._id,
    });

    return res.status(200).json({
      success: true,
      message: "Review added successfully",
    });
  },
);

interface IAddReplyData {
  reviewId: string;
  comment: string;
  courseId: string;
}

export const addReplyToReview = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId, comment, courseId } = req.body as IAddReplyData;

    if (!reviewId || !comment || !courseId) {
      return next(new ErrorHandler("Missing required fields", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const review = course.reviews.find(
      (rev) => rev._id.toString() === reviewId,
    );

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    const reply: any = {
      comment,
      user: req.user!._id,
    };

    review?.commentReplies?.push(reply);

    await course.save();

    await redis.del(courseId);
    await redis.del("allCourses");

    return res.status(200).json({
      success: true,
      message: "Reply added successfully",
    });
  },
);

export const getAllCoursesForAdmin = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getCourses(res);
    } catch (error) {
      return next(new ErrorHandler("Failed to get all courses", 500));
    }
  },
);

export const deleteCourse = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);

      if (!id || Array.isArray(id)) {
        return next(new ErrorHandler("Please provide course ID", 400));
      }

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      await course.deleteOne();
      await redis.del(id);
      await redis.del("allCourses");

      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
