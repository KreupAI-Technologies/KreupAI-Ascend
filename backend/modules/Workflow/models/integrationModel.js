//Khushi
//24-09-24
import mongoose from "mongoose";

const integrationSchema = new mongoose.Schema(
  {
    integration_type: {
      type: String,
      required: true,
    },
    api_endpoint: {
      type: String,
      required: true,
    },
    api_token: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
    last_sync_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Integration" }
);

const Integration = mongoose.model("Integration", integrationSchema);

export default Integration;
