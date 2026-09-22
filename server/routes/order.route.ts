import { Router } from "express";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/create-order", isAuthenticated, createOrder);
router.get(
  "/get-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders,
);

router.get(
  "/stripe-publishable-key",

  sendStripePublishableKey,
);

router.post("/payment", isAuthenticated, newPayment);

export default router;
