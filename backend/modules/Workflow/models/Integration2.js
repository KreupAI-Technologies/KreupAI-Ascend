import mongoose from 'mongoose';
import IncidentHeader from './incidentHeader.js';  // Adjust path as needed
import StandardRules from './StandardRules.js';   // Adjust path as needed
import Status from './Status.js';                 // Adjust path as needed


const integrationSchema = new mongoose.Schema({

  incident_process: { type:mongoose.Schema.Types.ObjectId, 
    ref: 'IncidentHeader', required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId
    , ref: 'StandardRules', required: true },
  sequence: { type: Number, required: true },
  serial_no: { type: Number, required: true },
  API_endpoint: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId
    , ref: 'Status', required: true },
});

export default mongoose.model('Integration', integrationSchema);
