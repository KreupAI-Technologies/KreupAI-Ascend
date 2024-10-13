//Khushi
//24-09-24

import mongoose from "mongoose";
// import User2 from "./User2";


const auditLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action_type: { type: String, required: true },
    action_details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ip_address: { type: String, required: true }
},{collection:"Audit Log"});

export default mongoose.model('AuditLog', auditLogSchema);