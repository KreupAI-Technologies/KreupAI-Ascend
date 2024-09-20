import mongoose from "mongoose";

const { Schema } = mongoose;

const workflowSchema = new Schema({
  workflow_name: { type: String, required: true },
  current_stage: { type: String, required: true },
  next_stage: { type: String },
  lead_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true,
  },
  created_date: { type: Date, default: Date.now },
  last_modified_date: { type: Date, default: Date.now },
  workflow_status: {
    type: String,
    enum: ["Active", "Completed"],
    default: "Active",
  },
  sla_deadline: { type: Date },
});

const Workflow = mongoose.model("Workflow", workflowSchema);

export default Workflow;
