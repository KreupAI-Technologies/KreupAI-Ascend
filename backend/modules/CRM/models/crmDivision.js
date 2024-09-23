

import mongoose from 'mongoose';

const { Schema } = mongoose;

const divisionSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'Division code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9_]{2,20}$/, 'Division code must consist of 2 to 20 uppercase letters, numbers, or underscores.'],
      validate: {
        validator: function (v) {
          try {
            return /^[A-Z0-9_]{2,20}$/.test(v);
          } catch (error) {
            console.error('Validation error in code:', error);
            return false;
          }
        },
        message: 'Division code must consist of 2 to 20 uppercase letters, numbers, or underscores.',
      },
    },
    name: {
      type: String,
      required: [true, 'Division name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Division name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Division name cannot be empty.',
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
  },
  {
    timestamps: true,
  }
);

// Indexes
divisionSchema.index({ code: 1 }, { unique: true });
divisionSchema.index({ name: 1 }, { unique: true });

const Division = mongoose.model('Division', divisionSchema);

export default Division;
