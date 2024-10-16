import mongoose from "mongoose";

const integrationProcessSchema = new mongoose.Schema({
  incident_process: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IncidentHeader",
    required: true,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StandardRules",
    required: true,
  },
  sequence: { type: Number, required: true },
  serial_no: { type: Number, required: true },
  API_endpoint: { type: String, required: true },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
});

const IntegrationProcess = mongoose.model(
  "IntegrationProcess",
  integrationProcessSchema
);

export default IntegrationProcess;
