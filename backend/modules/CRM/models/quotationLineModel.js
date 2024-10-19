// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Quotation Line model for the Quotation Lines collection

import mongoose from "mongoose";

// backend/models/quotationLine.model.js

const quotationLineSchema = new mongoose.Schema(
    {
      quotationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quotation",
        required: [true, "Quotation ID is required"],
        validate: {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Quotation ID",
        },
      },
      serialNo: {
        type: Number,
        required: [true, "Serial Number is required"],
        min: [1, "Serial Number must be at least 1"],
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
        validate: {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Product ID",
        },
      },
      itemDescription: {
        type: String,
        required: [true, "Item Description is required"],
        trim: true,
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
      },
      rate: {
        type: Number,
        required: [true, "Rate is required"],
        min: [0, "Rate cannot be negative"],
      },
      value: {
        type: Number,
        required: [true, "Value is required"],
        min: [0, "Value cannot be negative"],
      },
      discount: {
        type: Number,
        default: 0,
        min: [0, "Discount cannot be negative"],
      },
      netValue: {
        type: Number,
        required: [true, "Net Value is required"],
        min: [0, "Net Value cannot be negative"],
      },
      taxPercentage: {
        type: Number,
        required: [true, "Tax Percentage is required"],
        min: [0, "Tax Percentage cannot be negative"],
        max: [100, "Tax Percentage cannot exceed 100%"],
      },
      taxAmount: {
        type: Number,
        required: [true, "Tax Amount is required"],
        min: [0, "Tax Amount cannot be negative"],
      },
      netAmount: {
        type: Number,
        required: [true, "Net Amount is required"],
        min: [0, "Net Amount cannot be negative"],
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
      createdAt: {
        type: Date,
        default: Date.now,
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
      modifiedAt: {
        type: Date,
      },
    }
  );
  
  // Index to ensure unique serial numbers within the same quotation
  quotationLineSchema.index({ quotationId: 1, serialNo: 1 }, { unique: true });
  
  // Pre-save hook to ensure serial numbers are sequential within a quotation
  quotationLineSchema.pre("save", async function (next) {
    const QuotationLine = mongoose.model("QuotationLine");
    const count = await QuotationLine.countDocuments({ quotationId: this.quotationId });
    if (this.serialNo > count + 1) {
      return next(new Error("Serial Number must be sequential within the quotation"));
    }
    next();
  });
  
  const QuotationLine = mongoose.model("QuotationLine", quotationLineSchema);

  export default QuotationLine;
  