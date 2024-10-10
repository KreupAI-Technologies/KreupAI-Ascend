//Debayan
//21.9.24

import mongoose from "mongoose";

const VersionControlSchema = new mongoose.Schema({
  workflow_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workflow",
    required: true,
  },
  version_number: { type: String, required: true },
  change_description: { type: String },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_date: { type: Date, default: Date.now },
  last_modified_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  last_modified_date: { type: Date },
});

export default mongoose.model("VersionControl", VersionControlSchema);
