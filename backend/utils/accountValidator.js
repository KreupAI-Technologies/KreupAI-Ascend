import { body } from "express-validator";
import Account from "../modules/CRM/models/accountModel.js";
import mongoose from "mongoose";

export const validateCreateAccount = [
  body("clientId")
    .notEmpty()
    .withMessage("Client ID is required")
    .isLength({ max: 20 })
    .withMessage("Client ID cannot exceed 20 characters")
    .custom(async (value) => {
      const account = await Account.findOne({ clientId: value });
      if (account) {
        throw new Error("Client ID already exists");
      }
      return true;
    }),
  body("clientName")
    .notEmpty()
    .withMessage("Client Name is required")
    .isLength({ max: 100 })
    .withMessage("Client Name cannot exceed 100 characters"),
  body("createdBy")
    .notEmpty()
    .withMessage("Created By is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Created By User ID");
      }
      return true;
    }),
  // Additional validations for other fields can be added here
];

export const validateUpdateAccount = [
  // Validations can be added here similar to the POST route
  body("clientId")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Client ID cannot exceed 20 characters")
    .custom(async (value, { req }) => {
      const account = await Account.findOne({ clientId: value });
      if (account && account._id.toString() !== req.params.id) {
        throw new Error("Client ID already exists");
      }
      return true;
    }),
  body("clientName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Client Name cannot exceed 100 characters"),
  // Additional validations for other fields can be added here
];
