// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Product Category Model

import mongoose from "mongoose";

// backend/models/productCategory.model.js

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Category Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Parent Category ID",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created By is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Created By User ID",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for unique category names
productCategorySchema.index({ name: 1 }, { unique: true });

// Export the ProductCategory model
const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

export default ProductCategory;
