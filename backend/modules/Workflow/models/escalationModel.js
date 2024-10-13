import mongoose from 'mongoose';

const escalationSchema = new mongoose.Schema({
    incident_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true },
    escalation_trigger: { type: String, required: true }, // e.g., "Missed Deadline"
    escalated_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming reference to a user or role
    escalation_level: { type: String, enum: ['First Level', 'Second Level'], required: true },
    escalation_date: { type: Date, required: true },
    resolution_status: { type: String, enum: ['Pending', 'Resolved'], required: true },
    resolution_date: { type: Date }
});

export default mongoose.model('Escalation', escalationSchema);