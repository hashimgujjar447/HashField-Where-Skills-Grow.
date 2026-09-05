import { Router } from "express";
import {
  getUsersAnalytics,
  getCoursesAnalytics,
  getOrdersAnalytics,
} from "../controllers/analytics.controller.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
const router = Router();

router.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsersAnalytics,
);

router.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics,
);

router.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics,
);

export default router;
