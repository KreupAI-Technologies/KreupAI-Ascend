import User from "../models/userModel.js";
import Division from "../models/divisionModel.js"
import Department from "../models/departmentModel.js"
import { body } from "express-validator";
import mongoose from "mongoose";

// Validates user registration (signup)
export const validateSignup = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject("Username already in use");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email already in use");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("divisionId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Division ID");
      }
      const division = await Division.findById(value);
      if (!division) {
        throw new Error("Division does not exist");
      }
    }),
  body("departmentId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Department ID");
      }
      const department = await Department.findById(value);
      if (!department) {
        throw new Error("Department does not exist");
      }
    }),
];

// Validates user login
export const validateLogin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validates user's profile
export const validateProfile = [
  body("firstName")
    .optional()
    .notEmpty()
    .withMessage("First name cannot be empty"),
  body("lastName")
    .optional()
    .notEmpty()
    .withMessage("Last name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== req.user.userId) {
        return Promise.reject("Email already in use");
      }
    }),
  body("divisionId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Division ID");
      }
      const division = await Division.findById(value);
      if (!division) {
        throw new Error("Division does not exist");
      }
    }),
  body("departmentId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Department ID");
      }
      const department = await Department.findById(value);
      if (!department) {
        throw new Error("Department does not exist");
      }
    }),
];

// validates change password
export const validateUpdatePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters"),
];
