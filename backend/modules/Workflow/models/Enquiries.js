import mongoose from "mongoose";

const { Schema } = mongoose;

const EnquiriesSchema = new Schema(
  {
    incident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident_header",
      required: true,
    },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enquiries",
      default: null,
    },
    enquiry_to: {  // Changed to camelCase for consistency
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    suppressReservedKeysWarning: true  // Suppress warnings about reserved keys like `collection`
  }
);

const Enquiries = mongoose.model("Enquiries", EnquiriesSchema);

export default Enquiries;
