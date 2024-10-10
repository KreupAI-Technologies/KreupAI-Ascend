// backend/models/paymentTerm.model.js
// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Payment Term model for the Payment Terms collection

const paymentTermSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Payment Term name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Payment Term name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [255, "Description cannot exceed 255 characters"],
    },
    days: {
      type: Number,
      required: [true, "Number of days is required"],
      min: [0, "Number of days cannot be negative"],
      max: [365, "Number of days cannot exceed 365"],
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
paymentTermSchema.index({ name: 1 }, { unique: true });

// Export the PaymentTerm model
const PaymentTerm = mongoose.model("PaymentTerm", paymentTermSchema);

export default PaymentTerm;
