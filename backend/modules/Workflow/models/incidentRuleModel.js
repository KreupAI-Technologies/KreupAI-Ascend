import mongoose from "mongoose";

const incidentRuleSchema = new mongoose.Schema({
  incident_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IncidentHeader",
    required: true,
  },
  version: String,
  rule_id: String,
  sequence: Number,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Division: {
    type: String,
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status", // Assuming this refers to a Status collection
  },
  assigned_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  action_time: Date,
  Comments: String,
  Reminder_1_duration: Number,
  Reminder_2_duration: Number,
  Escalation_duration: Number,
});

const IncidentRule = mongoose.model("IncidentRule", incidentRuleSchema);

export default IncidentRule;