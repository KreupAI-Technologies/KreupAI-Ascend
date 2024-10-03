// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the departments collection and creates the Department model.

import mongoose from'mongoose';
import Division from './divisionModel.js' // Import the Division model

const departmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9_]{2,20}$/, // Adjust the regex as per your code format
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    divisionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division',
      required: true,
      validate: {
        validator: async function (value) {
          const division = await Division.findById(value);
          return !!division;
        },
        message: (props) => `Division ID ${props.value} does not exist`,
      },
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes on code, name, and divisionId
departmentSchema.index({ code: 1 });
departmentSchema.index({ name: 1 });
departmentSchema.index({ divisionId: 1 });

const Department = mongoose.model('Department', departmentSchema);

export default Department;