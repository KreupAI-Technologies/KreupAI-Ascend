// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the statuses collection and creates the Status model.

import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    statusGroup: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      match: /^[A-Z0-9_ ]{2,50}$/, // Adjust the regex as per your group name format
    },
    statusDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes on statusGroup and statusDescription
statusSchema.index({ statusGroup: 1 });
statusSchema.index({ statusDescription: 1 });

const Status = mongoose.model('Status', statusSchema);

export default Status;