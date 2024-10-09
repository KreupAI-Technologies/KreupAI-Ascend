// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the states collection and creates the State model.

import mongoose from "mongoose";
import Country from "./countryModel.js";

const stateSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9]{2,5}$/, // Adjust as per state code format
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Countries',
      required: true,
      validate: {
        validator: async function (value) {
          const country = await Country.findById(value);
          return !!country;
        },
        message: (props) => `Country ID ${props.value} does not exist`,
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
stateSchema.index({ countryId: 1 });

const State = mongoose.model('States', stateSchema);

export default State;