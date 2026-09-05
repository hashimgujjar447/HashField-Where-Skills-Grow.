import { Router } from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updateUserAvatar,
  updateUserPassword,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
import { deleteUserById } from "../services/user.service.js";

const router = Router();

router.post("/register", registrationUser);
router.post("/activate", activateUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/refresh", updateAccessToken);
router.get("/me", isAuthenticated, getUserInfo);
router.post("/socialAuth", socialAuth);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.put("/update-user-avatar", isAuthenticated, updateUserAvatar);
router.put("/update-password", isAuthenticated, updateUserPassword);

router.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers,
);

router.put(
  "/update-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole,
);

router.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser,
);
export default router;
