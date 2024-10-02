import mongoose from "mongoose";

const { Schema } = mongoose;

const ruleSchema = new Schema({
  rule_name: { type: String, required: true },
  trigger_event: { type: String, required: true },
  condition: { type: String, required: true },
  action: { type: String, required: true },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_date: { type: Date, default: Date.now },
  last_modified_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  last_modified_date: { type: Date, default: Date.now },
});

const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;
