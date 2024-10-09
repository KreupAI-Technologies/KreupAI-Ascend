// Author   : Bosco Sabu John
// Date   : 16/09/2024
// Version  : v1.0
// Description : This file defines the schema for the industries collection and creates the Industry model.

import mongoose from "mongoose";

const industrySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9]{2,10}$/, // Adjust the regex as per your code format
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
industrySchema.index({ code: 1 });
industrySchema.index({ name: 1 });

const Industry = mongoose.model("Industry", industrySchema);

export default Industry;
