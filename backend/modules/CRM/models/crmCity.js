// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the cities collection and creates the city model.
// Code changes made by: Thejeshwar 

import mongoose from 'mongoose';
// import State from './crmState.js';

const { Schema } = mongoose;

const citySchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9]{2,5}$/, // Adjust as per city code format
      validate: {
        validator: function (v) {
          return /^[A-Z0-9]{2,5}$/.test(v);
        },
        message: 'City code must consist of 2 to 5 uppercase letters or numbers.',
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
        message: 'City name is required.',
      },
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: 'State',
      required: true,
      validate: {
        validator: async function (value) {
          const state = await State.findById(value);
          return !!state;
        },
        message: (props) => `State ID ${props.value} does not exist in Scitiescollection.`,
      },
    },
    dcityption: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes on code, name, and stateId
citySchema.index({ code: 1 });
citySchema.index({ name: 1 });
citySchema.index({ stateId: 1 });

const City = mongoose.model('City', citySchema);

export default City;
