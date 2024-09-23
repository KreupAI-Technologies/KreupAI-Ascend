// models/Department.js

import mongoose from 'mongoose';
import Division from './crmDivision.js'; // Import the Division model

const { Schema } = mongoose;

const departmentSchema = new Schema(
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
    divisionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division',
      required: true,
      validate: {
        validator: async function (value) {
          try {
            const division = await Division.findById(value);
            return !!division;
          } catch (error) {
            console.error('Validation error in divisionId:', error);
            return false;
          }
        },
        message: (props) => `Division ID ${props.value} does not exist`,
      },
    },
    description: {
      type: String,
      default: '',
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

// Create indexes on code, name, and divisionId
departmentSchema.index({ code: 1 }, { unique: true });
departmentSchema.index({ name: 1 }, { unique: true });
departmentSchema.index({ divisionId: 1 });

const Department = mongoose.model('Department', departmentSchema);

export default Department;
