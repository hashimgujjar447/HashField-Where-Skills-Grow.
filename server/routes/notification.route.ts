import { getNotifications } from "../controllers/notification.controller.js";

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

export default router;
