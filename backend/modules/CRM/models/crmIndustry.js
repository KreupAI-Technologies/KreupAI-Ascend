// Author   : Bosco Sabu John
// Date   : 16/09/2024
// Version  : v1.0
// Description : This file defines the schema for the industries collection and creates the Industry model.
// Code changes made by: Thejeshwar 
// models/Industry.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Industry schema
const industrySchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'Industry code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9]{2,10}$/, 'Industry code must consist of 2 to 10 uppercase letters or numbers.'],
      validate: {
        validator: function (v) {
          try {
            return /^[A-Z0-9]{2,10}$/.test(v);
          } catch (error) {
            console.error('Validation error in code:', error);
            return false;
          }
        },
        message: 'Industry code must consist of 2 to 10 uppercase letters or numbers.',
      },
    },
    name: {
      type: String,
      required: [true, 'Industry name is required'],
      trim: true,
      maxlength: [100, 'Industry name must not exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Industry name cannot be empty.',
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

// Create indexes on code and name
industrySchema.index({ code: 1 });
industrySchema.index({ name: 1 });

const Industry = mongoose.model('Industry', industrySchema);

export default Industry;
