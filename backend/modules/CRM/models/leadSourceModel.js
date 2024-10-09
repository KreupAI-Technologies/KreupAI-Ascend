// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the lead sources collection and creates the LeadSource model.

import mongoose from "mongoose";

const leadSourceSchema = new mongoose.Schema(
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
leadSourceSchema.index({ code: 1 });
leadSourceSchema.index({ name: 1 });

const LeadSource = mongoose.model("LeadSource", leadSourceSchema);

export default LeadSource;
