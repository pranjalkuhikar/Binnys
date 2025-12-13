// import express from "express";
// import {
//   register,
//   login,
//   logout,
//   profile,
//   getAllUsers,
// } from "../controllers/user.controller.js";
// import {
//   refreshToken,
//   authenticate,
//   authorizeRoles,
// } from "../middlewares/auth.middleware.js";
// import { validate } from "../middlewares/validation.middleware.js";
// import { registerSchema, loginSchema } from "../validations/user.validation.js";

// const router = express.Router();

// router.post("/register", validate(registerSchema), register);
// router.post("/login", validate(loginSchema), login);
// router.post("/logout", authenticate, logout);
// router.post("/refresh", refreshToken);
// router.get("/profile", authenticate, profile);

// Admin routes
// router.get("/admin/users", authenticate, authorizeRoles("admin"), getAllUsers);

// export default router;
