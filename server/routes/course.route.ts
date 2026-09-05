import { Router } from "express";
import {
  getSingleCourse,
  uploadCourse,
  getAllCourses,
  editCourse,
  getCourseByUser,
  addQuestion,
  addQuestionAnswer,
  addReview,
  addReplyToReview,
  getAllCoursesForAdmin,
  deleteCourse,
} from "../controllers/course.controller.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse,
);

router.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse,
);

router.get("/get-all-courses", getAllCourses);
router.get("/get-course/:id", getSingleCourse);
router.get("/get-course-content/:id", isAuthenticated, getCourseByUser);
router.post("/add-question", isAuthenticated, addQuestion);
router.post("/add-question-answer", isAuthenticated, addQuestionAnswer);
router.post("/add-review/:courseId", isAuthenticated, addReview);
router.post("/add-reply-to-review", isAuthenticated, addReplyToReview);
router.get(
  "/get-all-courses-for-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesForAdmin,
);

router.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse,
);
export default router;
