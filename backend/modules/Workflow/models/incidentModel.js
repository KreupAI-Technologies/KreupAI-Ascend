import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
    incident_name: { type: String, required: true }, // e.g., "Contact Lead"
    lead_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true }, // Reference to Leads
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Users
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }, // Status
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }, // Priority
    due_date: { type: Date },
    created_date: { type: Date, default: Date.now },
    completed_date: { type: Date },
    last_modified_date: { type: Date, default: Date.now },
    escalation_level: { type: String, enum: ['None', 'Manager', 'Supervisor'] }, // Escalation level
    related_documents: [{ type: String }] // Array of file references
});

export default mongoose.model('Incident', incidentSchema);
