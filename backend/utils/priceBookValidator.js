import { body } from "express-validator";
import PriceBook from "../modules/CRM/models/priceBookModel.js";

export const validateCreatePriceBook =  [
    body("priceBookId")
      .notEmpty()
      .withMessage("Price Book ID is required")
      .isLength({ max: 50 })
      .withMessage("Price Book ID cannot exceed 50 characters")
      .custom(async (value) => {
        const existingPriceBook = await PriceBook.findOne({ priceBookId: value });
        if (existingPriceBook) {
          throw new Error("Price Book ID must be unique");
        }
        return true;
      }),
    body("priceBookName")
      .notEmpty()
      .withMessage("Price Book Name is required")
      .isLength({ max: 100 })
      .withMessage("Price Book Name cannot exceed 100 characters"),
    body("description").optional().trim(),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("IsActive must be a boolean value"),
  ];

  export const validateUpdatePriceBook = [
    body("priceBookId")
      .optional()
      .notEmpty()
      .withMessage("Price Book ID cannot be empty")
      .isLength({ max: 50 })
      .withMessage("Price Book ID cannot exceed 50 characters")
      .custom(async (value, { req }) => {
        const existingPriceBook = await PriceBook.findOne({
          priceBookId: value,
          _id: { $ne: req.params.id },
        });
        if (existingPriceBook) {
          throw new Error("Price Book ID must be unique");
        }
        return true;
      }),
    body("priceBookName")
      .optional()
      .notEmpty()
      .withMessage("Price Book Name cannot be empty")
      .isLength({ max: 100 })
      .withMessage("Price Book Name cannot exceed 100 characters"),
    body("description").optional().trim(),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("IsActive must be a boolean value"),
  ];