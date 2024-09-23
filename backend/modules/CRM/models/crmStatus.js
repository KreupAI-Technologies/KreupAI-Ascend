

import mongoose from 'mongoose';

const { Schema } = mongoose;

const statusSchema = new Schema(
  {
    statusGroup: {
      type: String,
      required: [true, 'Status Group is required'],
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9_ ]{2,50}$/, 'Status Group must consist of 2 to 50 uppercase letters, numbers, underscores, or spaces.'],
      validate: {
        validator: function (v) {
          try {
            return /^[A-Z0-9_ ]{2,50}$/.test(v);
          } catch (error) {
            console.error('Validation error in statusGroup:', error);
            return false;
          }
        },
        message: 'Status Group must consist of 2 to 50 uppercase letters, numbers, underscores, or spaces.',
      },
    },
    statusDescription: {
      type: String,
      required: [true, 'Status Description is required'],
      trim: true,
      maxlength: [255, 'Description cannot exceed 255 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 255;
          } catch (error) {
            console.error('Validation error in statusDescription:', error);
            return false;
          }
        },
        message: 'Description cannot exceed 255 characters.',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes on statusGroup and statusDescription
statusSchema.index({ statusGroup: 1 });
statusSchema.index({ statusDescription: 1 });

const Status = mongoose.model('Status', statusSchema);

export default Status;
