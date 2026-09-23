import {
  getNotifications,
  markAllNotificationsAsRead,
  updateNotificationStatus,
} from "../controllers/notification.controller.js";

import { Router } from "express";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications,
);

router.put(
  "/update-notification-status/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotificationStatus,
);

router.put(
  "/update-all-notification",
  isAuthenticated,
  authorizeRoles("admin"),
  markAllNotificationsAsRead,
);

export default router;
