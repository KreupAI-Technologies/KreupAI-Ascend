//Debayan
//21.9.24

import mongoose from "mongoose";

const AIInsightSchema = new mongoose.Schema({
  incident_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true,
  },
  lead_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  insight_text: { type: String, required: true },
  generated_date: { type: Date, default: Date.now },
});

export default mongoose.model("AIInsight", AIInsightSchema);
