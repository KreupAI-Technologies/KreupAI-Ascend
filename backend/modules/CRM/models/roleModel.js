// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the roles collection and creates the Role model.


import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[a-z_]{3,30}$/, // Adjust regex as needed
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Create an index on name
roleSchema.index({ name: 1 });

const Role = mongoose.model('Role', roleSchema);

export default Role;
