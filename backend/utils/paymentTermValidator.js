import { body } from "express-validator";
import PaymentTerm from "../modules/CRM/models/paymentTermModel.js";

export const validateCreatePaymentTerm = [
  body("name")
    .notEmpty()
    .withMessage("Payment Term name is required")
    .isLength({ max: 100 })
    .withMessage("Payment Term name cannot exceed 100 characters")
    .custom(async (value) => {
      const existingTerm = await PaymentTerm.findOne({ name: value });
      if (existingTerm) {
        throw new Error("Payment Term name already exists");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),
  body("days")
    .notEmpty()
    .withMessage("Number of days is required")
    .isInt({ min: 0, max: 365 })
    .withMessage("Number of days must be between 0 and 365"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];

export const validateUpdatePaymentTerm = [
  body("name")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Payment Term name cannot exceed 100 characters")
    .custom(async (value, { req }) => {
      const existingTerm = await PaymentTerm.findOne({ name: value });
      if (existingTerm && existingTerm._id.toString() !== req.params.id) {
        throw new Error("Payment Term name already exists");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),
  body("days")
    .optional()
    .isInt({ min: 0, max: 365 })
    .withMessage("Number of days must be between 0 and 365"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];
