const mongoose = require('mongoose');
const { Schema } = mongoose;

const auditLogSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action_type: { type: String, required: true },
    action_details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ip_address: { type: String, required: true }
},{collection:"Audit Log"});

module.exports = mongoose.model('AuditLog', auditLogSchema);