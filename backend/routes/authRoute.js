// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the users collection and creates the User model.

import express from "express";
import cookieAuthMiddleware from "../middleware/cookieAuthMiddleware.js";

import {
  validateProfile,
  validateSignup,
  validateLogin,
  validateUpdatePassword,
} from "../utils/authValidator.js";

import {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getProfile,
  updateProfile,
  updatePassword,
  searchUser,
} from "../controllers/authController.js";

const router = express.Router();

// User registration (signup)
router.post("/auth/signup", validateSignup, signup);

// Verify email
router.post("/auth/verify-email", verifyEmail);

// User login
router.post("/auth/login", validateLogin, login);

// Forgot password
router.post("/auth/forgot-password", forgotPassword);

// Reset password
router.post("/auth/reset-password/:token", resetPassword);

// User logout
router.post("/auth/logout", logout)

// Get current user's profile
router.get("/auth/profile", cookieAuthMiddleware, getProfile);

// Update current user's profile
router.put("/auth/profile", cookieAuthMiddleware, validateProfile, updateProfile);

// Change password
router.put(
  "/auth/change-password",
  cookieAuthMiddleware,
  validateUpdatePassword,
  updatePassword
);

// Search users by first name, last name, or username
router.get("/users", cookieAuthMiddleware, searchUser);

export default router;
