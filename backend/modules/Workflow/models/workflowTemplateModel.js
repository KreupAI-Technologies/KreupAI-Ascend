//Debayan
//21.9.24

import mongoose from "mongoose";

const WorkflowTemplateSchema = new mongoose.Schema({
  template_name: { type: String, required: true },
  template_description: { type: String },
  steps: { type: Array, default: [] },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_date: { type: Date, default: Date.now },
});

export default mongoose.model("WorkflowTemplate", WorkflowTemplateSchema);
