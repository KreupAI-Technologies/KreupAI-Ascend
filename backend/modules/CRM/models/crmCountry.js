// Author   : Bosco Sabu John
// Date   : 16/09/2024
// Version  : v1.0
// Description : This file defines the schema for the countries collection and creates the Country model.
// Code changes made by: Thejeshwar 

import mongoose from 'mongoose';
const { Schema } = mongoose;
const countrySchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z]{3}$/, // Exactly 3 uppercase letters
      validate: {
        validator: function (v) {
          try {
            return /^[A-Z]{3}$/.test(v);
          } catch (error) {
            console.error('Validation error in code:', error);
            return false;
          }
        },
        message: 'Country code must consist of exactly 3 uppercase letters.',
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Country name is required.',
      },
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          try {
            return /^[A-Z]{3}$/.test(v); 
          } catch (error) {
            console.error('Validation error in currency:', error);
            return false;
          }
        },
        message: 'Currency must consist of exactly 3 uppercase letters.',
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


countrySchema.index({ code: 1 });
countrySchema.index({ name: 1 });

const Country = mongoose.model('Country', countrySchema);

export default Country;
