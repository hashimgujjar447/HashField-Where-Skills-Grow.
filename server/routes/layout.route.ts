import { Router } from "express";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout,
);
router.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout,
);
router.get("/get-layout", getLayoutByType);

export default router;
