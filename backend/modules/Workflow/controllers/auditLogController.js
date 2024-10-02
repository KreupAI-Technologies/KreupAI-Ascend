//Khushi
//24-09-24

import AuditLog from '../models/auditLog.js';

export const getAllLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createLog = async (req, res) => {
    const { user_id, action_type, action_details, ip_address } = req.body;
    try {
        const newLog = new AuditLog({
            user_id,
            action_type,
            action_details,
            ip_address
        });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getLogById = async (req, res) => {
    try {
        const log = await AuditLog.findById(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
