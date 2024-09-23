// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Delivery Term model for the Delivery Terms collection

import mongoose from 'mongoose';

const { Schema } = mongoose;

const deliveryTermSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Delivery Term name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Delivery Term name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Delivery Term name cannot be empty.',
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
deliveryTermSchema.index({ name: 1 }, { unique: true });

const DeliveryTerm = mongoose.model('DeliveryTerm', deliveryTermSchema);

export default DeliveryTerm;
