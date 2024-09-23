// backend/models/paymentTerm.model.js
// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Payment Term model for the Payment Terms collection
// Code changes made by: Thejeshwar 

import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentTermSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Payment Term name is required'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: [100, 'Payment Term name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return /^[A-Z0-9\s]{1,100}$/.test(v);
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Payment Term name must consist of up to 100 uppercase letters, numbers, or spaces.',
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
    days: {
      type: Number,
      required: [true, 'Number of days is required'],
      min: [0, 'Number of days cannot be negative'],
      max: [365, 'Number of days cannot exceed 365'],
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 0 && v <= 365;
          } catch (error) {
            console.error('Validation error in days:', error);
            return false;
          }
        },
        message: 'Days must be an integer between 0 and 365.',
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
paymentTermSchema.index({ name: 1 }, { unique: true });

const PaymentTerm = mongoose.model('PaymentTerm', paymentTermSchema);

export default PaymentTerm;
