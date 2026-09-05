import { Router } from "express";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";

const router = Router();

router.post("/create-order", isAuthenticated, createOrder);
router.get(
  "/get-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders,
);

export default router;
