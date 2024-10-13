// backend/models/paymentMethod.model.js

// Author: Bosco Sabu John
// Date: 17/09/2024
// Version: v1.0
// Description: Delivery Term model for the Delivery Terms collection

import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Payment Method name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Payment Method name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [255, "Description cannot exceed 255 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
paymentMethodSchema.index({ name: 1 }, { unique: true });

// Export the PaymentMethod model
const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;
