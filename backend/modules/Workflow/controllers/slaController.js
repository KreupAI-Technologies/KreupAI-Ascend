import SLA from '../models/Sla.js';

// Create a new SLA record
export const createSLA = async (req, res) => {
    try {
        const newSLA = new SLA({
            workflow_id: req.body.workflow_id,
            incident_id: req.body.incident_id,
            sla_deadline: req.body.sla_deadline,
            sla_status: req.body.sla_status || 'In Progress',
            sla_start_date: req.body.sla_start_date,
            sla_end_date: req.body.sla_end_date
        });
        const savedSLA = await newSLA.save();
        res.status(201).json(savedSLA);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all SLA records
export const getSLAs = async (req, res) => {
    try {
        const slas = await SLA.find().populate('workflow_id incident_id');
        res.status(200).json(slas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update SLA status
export const updateSLA = async (req, res) => {
    try {
        const updatedSLA = await SLA.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json(updatedSLA);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete SLA
export const deleteSLA = async (req, res) => {
    try {
        await SLA.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
