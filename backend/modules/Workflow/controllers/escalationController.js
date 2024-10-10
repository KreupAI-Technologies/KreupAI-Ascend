import Escalation from '../models/escalationModel.js';

// Create a new Escalation
export const createEscalation = async (req, res) => {
    try {
        const escalation = new Escalation(req.body);
        await escalation.save();
        res.status(201).json(escalation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Escalations
export const getEscalations = async (req, res) => {
    try {
        const escalations = await Escalation.find().populate('incident_id').populate('escalated_to');
        res.status(200).json(escalations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Escalation by ID
export const getEscalationById = async (req, res) => {
    try {
        const escalation = await Escalation.findById(req.params.id).populate('incident_id').populate('escalated_to');
        if (!escalation) return res.status(404).json({ message: 'Escalation not found' });
        res.status(200).json(escalation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Escalation
export const updateEscalation = async (req, res) => {
    try {
        const escalation = await Escalation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!escalation) return res.status(404).json({ message: 'Escalation not found' });
        res.status(200).json(escalation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an Escalation
export const deleteEscalation = async (req, res) => {
    try {
        const escalation = await Escalation.findByIdAndDelete(req.params.id);
        if (!escalation) return res.status(404).json({ message: 'Escalation not found' });
        res.status(200).json({ message: 'Escalation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};