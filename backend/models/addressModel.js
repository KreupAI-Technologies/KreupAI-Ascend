// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the addresses collection and creates the Address model.

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    addressLines: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0 && v.length <= 3;
        },
        message: "Address must have at least one line and at most three lines.",
      },
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cities",
      required: false,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
      required: false,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Countries",
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

const Address = mongoose.model("Address", addressSchema);

export default Address;
