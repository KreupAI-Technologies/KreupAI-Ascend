import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  lead_name: { type: String, required: true },
  contact_person: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  lead_source: { type: String, required: true }, // e.g., "Website", "Referral"
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to Users
  lead_status: {
    type: String,
    enum: ["New", "Qualified", "Contacted"],
    default: "New",
  },
  created_date: { type: Date, default: Date.now },
  last_contact_date: { type: Date },
  next_action_date: { type: Date },
});

const workflowLead = mongoose.model("workflowLead", leadSchema);
export default workflowLead;
