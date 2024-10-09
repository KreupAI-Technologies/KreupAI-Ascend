// Author   : Bosco Sabu John
// Date   : 16/09/2024
// Version  : v1.0
// Description : This file defines the schema for the lead sub-sources collection and creates the LeadSubSource model.

import mongoose from "mongoose";
import LeadSource from "./leadSourceModel.js";

const leadSubSourceSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9_]{2,30}$/, // Adjust the regex as per your code format
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    leadSourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeadSource",
      required: true,
      validate: {
        validator: async function (value) {
          const leadSource = await LeadSource.findById(value);
          return !!leadSource;
        },
        message: (props) =>
          `Lead Source ID ${props.value} does not exist in LeadSources collection`,
      },
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

// Create indexes on code, name, and leadSourceId
leadSubSourceSchema.index({ code: 1 });
leadSubSourceSchema.index({ name: 1 });
leadSubSourceSchema.index({ leadSourceId: 1 });

const LeadSubSource = mongoose.model("LeadSubSource", leadSubSourceSchema);

export default LeadSubSource;
