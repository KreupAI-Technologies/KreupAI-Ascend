import mongoose from 'mongoose';

const { Schema } = mongoose;

const slaSchema = new Schema({
    workflow_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workflow',
        required: true
    },
    incident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incident',
        required: true
    },
    sla_deadline: {
        type: Date,
        required: true
    },
    sla_status: {
        type: String,
        enum: ['In Progress', 'Breached', 'Met'],
        default: 'In Progress'
    },
    sla_start_date: {
        type: Date,
        required: true
    },
    sla_end_date: {
        type: Date,
        required: false
    }
});

const SLA = mongoose.model('SLA', slaSchema);
export default SLA;