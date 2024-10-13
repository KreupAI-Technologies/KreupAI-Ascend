import mongoose from "mongoose";

const ClarificationsSchema = new mongoose.Schema(
  {
    incident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident_header",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Comments: {
      type: String,
      required: true,
      trim: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clarifications",
      default: null,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
);

const Clarifications = mongoose.model("Clarifications", ClarificationsSchema);

export default Clarifications;
