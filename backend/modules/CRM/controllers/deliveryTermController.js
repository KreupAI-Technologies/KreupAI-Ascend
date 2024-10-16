import { validationResult } from "express-validator";
import DeliveryTerm from "../models/deliveryTermModel.js";

// Create a new Delivery Term
export const createDeliveryTerm = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const deliveryTermData = req.body;

        // Create a new DeliveryTerm instance
        const deliveryTerm = new DeliveryTerm(deliveryTermData);
        await deliveryTerm.save();

        res.status(201).json(deliveryTerm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all Delivery Terms
export const getAllDeliveryTerms = async (req, res) => {
    try {
        const deliveryTerms = await DeliveryTerm.find();
        res.json(deliveryTerms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a Delivery Term by ID
export const getDeliveryTermById = async (req, res) => {
    try {
        const deliveryTerm = await DeliveryTerm.findById(req.params.id);
        if (!deliveryTerm) {
            return res.status(404).json({ message: 'Delivery Term not found' });
        }
        res.json(deliveryTerm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a Delivery Term
export const updateDeliveryTerm = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updates = req.body;

        const deliveryTerm = await DeliveryTerm.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });

        if (!deliveryTerm) {
            return res.status(404).json({ message: 'Delivery Term not found' });
        }
        res.json(deliveryTerm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a Delivery Term
export const deleteDeliveryTerm = async (req, res) => {
    try {
        const deliveryTerm = await DeliveryTerm.findByIdAndDelete(req.params.id);
        if (!deliveryTerm) {
            return res.status(404).json({ message: 'Delivery Term not found' });
        }
        res.json({ message: 'Delivery Term deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}