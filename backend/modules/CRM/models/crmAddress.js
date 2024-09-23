// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the addresses collection and creates the Address model.
// Code changes made by: Thejeshwar 

import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    addressLines: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          try {
            // Ensure there is at least one line and no more than three lines
            return v.length > 0 && v.length <= 3;
          } catch (error) {
            console.error('Validation error in addressLines:', error);
            return false;
          }
        },
        message: 'Address must have at least one line and at most three lines.',
      },
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: false,
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: 'State',
      required: false,
    },
    countryId: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
addressSchema.index({ postalCode: 1 });
addressSchema.index({ cityId: 1 });
addressSchema.index({ stateId: 1 });
addressSchema.index({ countryId: 1 });

const Address = mongoose.model('Address', addressSchema);

export default Address;