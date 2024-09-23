import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentMethodSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Payment Method name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Payment Method name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Payment Method name cannot be empty.',
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [255, 'Description cannot exceed 255 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 255;
          } catch (error) {
            console.error('Validation error in description:', error);
            return false;
          }
        },
        message: 'Description cannot exceed 255 characters.',
      },
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

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;