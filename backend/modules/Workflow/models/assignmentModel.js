import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  Incident_process: {
    type: String,
    required: true,
  },
  incident_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IncidentHeader",
    required: true,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
