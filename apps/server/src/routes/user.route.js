import express from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/user.controller.js";
import {
  refreshToken,
  authenticate,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema } from "../validations/user.validation.js";

const router = express.Router();

router.post(
  "/register",
  authenticate,
  authorizeRoles("admin"),
  validate(registerSchema),
  register
);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/profile", authenticate, profile);
router.get("/refresh", refreshToken);

export default router;
