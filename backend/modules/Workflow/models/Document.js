//Debayan
//21.9.24
import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  incident_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true,
  },
  document_type: { type: String, required: true },
  file_path: { type: String, required: true },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploaded_date: { type: Date, default: Date.now },
  last_modified_date: { type: Date },
});

export default mongoose.model("Document", DocumentSchema);
