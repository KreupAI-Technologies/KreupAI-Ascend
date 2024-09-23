import Incident from '../models/Incident.js';

// Create a new Incident
export const createIncident = async (req, res) => {
    try {
        const incident = new Incident(req.body);
        await incident.save();
        res.status(201).json(incident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Incidents
export const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find().populate('lead_id').populate('assigned_to');
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Incident by ID
export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id).populate('lead_id').populate('assigned_to');
        if (!incident) return res.status(404).json({ message: 'Incident not found' });
        res.status(200).json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Incident
export const updateIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!incident) return res.status(404).json({ message: 'Incident not found' });
        res.status(200).json(incident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an Incident
export const deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id);
        if (!incident) return res.status(404).json({ message: 'Incident not found' });
        res.status(200).json({ message: 'Incident deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
