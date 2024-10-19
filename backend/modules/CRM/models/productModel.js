// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Product Model

import mongoose from "mongoose";

// backend/models/product.model.js

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: [true, "Product Code is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Product Code cannot exceed 50 characters"],
    },
    productActive: {
      type: Boolean,
      default: true,
    },
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: [true, "Product Category ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Product Category ID",
      },
    },
    productName: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
      maxlength: [100, "Product Name cannot exceed 100 characters"],
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Vendor ID",
      },
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Manufacturer ID",
      },
    },
    salesStartDate: {
      type: Date,
    },
    salesEndDate: {
      type: Date,
    },
    supportStartDate: {
      type: Date,
    },
    supportEndDate: {
      type: Date,
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit Price is required"],
      min: [0, "Unit Price cannot be negative"],
    },
    tag: {
      type: String,
      trim: true,
    },
    usageUnit: {
      type: String,
      trim: true,
    },
    box: {
      type: String,
      trim: true,
    },
    quantityInStock: {
      type: Number,
      min: [0, "Quantity In Stock cannot be negative"],
      default: 0,
    },
    commissionRate: {
      type: Number,
      min: [0, "Commission Rate cannot be negative"],
      max: [100, "Commission Rate cannot exceed 100%"],
    },
    quantityOrdered: {
      type: Number,
      min: [0, "Quantity Ordered cannot be negative"],
      default: 0,
    },
    reorderLevel: {
      type: Number,
      min: [0, "Reorder Level cannot be negative"],
    },
    handlerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Handler ID",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    quantityInDemand: {
      type: Number,
      min: [0, "Quantity In Demand cannot be negative"],
      default: 0,
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
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Modified By User ID",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Unique index on productCode
productSchema.index({ productCode: 1 }, { unique: true });

// Pre-save hook to validate vendor and manufacturer
// productSchema.pre("save", async function (next) {
//   const product = this;
//   const Account = mongoose.model("Account");

//   if (product.vendorId) {
//     const vendor = await Account.findOne({
//       _id: product.vendorId,
//       accountType: "Vendors", // Assuming 'accountType' field in Account model
//     });
//     if (!vendor) {
//       return next(new Error('Vendor not found or is not of type "Vendors"'));
//     }
//   }

//   if (product.manufacturerId) {
//     const manufacturer = await Account.findOne({
//       _id: product.manufacturerId,
//       accountType: "Vendors", // Assuming 'accountType' field in Account model
//     });
//     if (!manufacturer) {
//       return next(
//         new Error('Manufacturer not found or is not of type "Vendors"')
//       );
//     }
//   }

//   next();
// });

const Product = mongoose.model("Product", productSchema);

export default Product;
