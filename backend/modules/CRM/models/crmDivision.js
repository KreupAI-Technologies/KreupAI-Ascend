// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the divisions collection and creates the Division model.

import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema(
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
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes on code and name
divisionSchema.index({ code: 1 });
divisionSchema.index({ name: 1 });

const crmDivision = mongoose.model("crmDivision", divisionSchema);

export default crmDivision;
