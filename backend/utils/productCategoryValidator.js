import mongoose from "mongoose";
import { body } from "express-validator";
import ProductCategory from "../modules/CRM/models/productCategoryModel.js";

export const validateCreateProductCategory = [
  body("name")
    .notEmpty()
    .withMessage("Category Name is required")
    .isLength({ max: 100 })
    .withMessage("Category Name cannot exceed 100 characters")
    .custom(async (value) => {
      const existingCategory = await ProductCategory.findOne({ name: value });
      if (existingCategory) {
        throw new Error("Category Name must be unique");
      }
      return true;
    }),
  body("description").optional().trim(),
  body("parentCategoryId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Parent Category ID");
      }
      const categoryExists = await ProductCategory.exists({ _id: value });
      if (!categoryExists) {
        throw new Error("Parent Category not found");
      }
      return true;
    }),
];

export const validateUpdateProductCategory = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Category Name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Category Name cannot exceed 100 characters")
    .custom(async (value, { req }) => {
      const existingCategory = await ProductCategory.findOne({
        name: value,
        _id: { $ne: req.params.id },
      });
      if (existingCategory) {
        throw new Error("Category Name must be unique");
      }
      return true;
    }),
  body("description").optional().trim(),
  body("parentCategoryId")
    .optional()
    .custom(async (value, { req }) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Parent Category ID");
      }
      if (value === req.params.id) {
        throw new Error("A category cannot be its own parent");
      }
      const categoryExists = await ProductCategory.exists({ _id: value });
      if (!categoryExists) {
        throw new Error("Parent Category not found");
      }
      return true;
    }),
];
