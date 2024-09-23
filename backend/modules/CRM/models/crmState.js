// Author   : Bosco Sabu John
// Date   : 16/09/2024
// Version  : v1.0
// Description : This file defines the schema for the states collection and creates the state model.
// Code changes made by: Thejeshwar 

import mongoose from 'mongoose';
import Country from './crmCountry.js'; // Import the Country model

const { Schema } = mongoose;

const stateSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9]{2,5}$/, // Adjust as per state code format
      validate: {
        validator: function (v) {
          return /^[A-Z0-9]{2,5}$/.test(v);
        },
        message: 'State code must consist of 2 to 5 uppercase letters or numbers.',
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'State name is required.',
      },
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
      validate: {
        validator: async function (value) {
          const country = await Country.findById(value);
          return !!country;
        },
        message: (props) => `Country ID ${props.value} does not exist.`,
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
stateSchema.index({ code: 1 });
stateSchema.index({ name: 1 });

const State = mongoose.model('State', stateSchema);

export default State;
