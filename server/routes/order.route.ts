import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/create-order", isAuthenticated, createOrder);

export default router;
