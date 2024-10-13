//Debayan
//21.9.24

import mongoose from "mongoose";

const TimeTrackingSchema = new mongoose.Schema({
  incident_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  start_time: { type: Date, required: true },
  end_time: { type: Date },
  duration: { type: Number }, // Duration in seconds or minutes
});

export default mongoose.model("TimeTracking", TimeTrackingSchema);
