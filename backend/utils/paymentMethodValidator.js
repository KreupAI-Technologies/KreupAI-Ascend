import PaymentMethod from "../modules/CRM/models/paymentMethodModel.js";
import { body } from "express-validator";

export const validateCreatePaymentMethod = [
  body("name")
    .notEmpty()
    .withMessage("Payment Method name is required")
    .isLength({ max: 100 })
    .withMessage("Payment Method name cannot exceed 100 characters")
    .custom(async (value) => {
      const existingMethod = await PaymentMethod.findOne({ name: value });
      if (existingMethod) {
        throw new Error("Payment Method name already exists");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];
