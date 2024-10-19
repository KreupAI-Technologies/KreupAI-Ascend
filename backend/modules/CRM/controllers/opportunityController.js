import Opportunity from "../models/opportunityModel.js";
import { validationResult } from "express-validator"

// Create a new Opportunity
export const createOpportunity = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const opportunityData = req.body;

        // Create a new Opportunity instance
        const opportunity = new Opportunity(opportunityData);
        await opportunity.save();

        res.status(201).json(opportunity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all Opportunities
export const getOpportunity = async (req, res) => {
    try {
        const opportunities = await Opportunity.find()
            .populate('userId', 'firstName lastName username')
            .populate('accountId', 'clientName')
            .populate('contactId', 'firstName lastName email')
            .populate('typeId', 'statusDescription')
            .populate('leadSourceId', 'name')
            .populate('stageId', 'statusDescription');
        res.json(opportunities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get an Opportunity by ID
export const getOpportunityById = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id)
            .populate('userId', 'firstName lastName username')
            .populate('accountId', 'clientName')
            .populate('contactId', 'firstName lastName email')
            .populate('typeId', 'statusDescription')
            .populate('leadSourceId', 'name')
            .populate('stageId', 'statusDescription');
        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }
        res.json(opportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an Opportunity
export const updateOpportunity = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updates = req.body;

        const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        })
            .populate('userId', 'firstName lastName username')
            .populate('accountId', 'clientName')
            .populate('contactId', 'firstName lastName email')
            .populate('typeId', 'statusDescription')
            .populate('leadSourceId', 'name')
            .populate('stageId', 'statusDescription');

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        res.json(opportunity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete an Opportunity
export const deleteOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }
        res.json({ message: 'Opportunity deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
