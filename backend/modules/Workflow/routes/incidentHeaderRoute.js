import express from 'express';
import {
  createIncidentHeader,
  getAllIncidentHeaders,
  getIncidentHeaderById,
  updateIncidentHeader,
  deleteIncidentHeader,
} from '../controllers/IncidentHeaderController.js';

const router = express.Router();

// Create a new Incident Header
router.post('/', createIncidentHeader);

// Get all Incident Headers
router.get('/', getAllIncidentHeaders);

// Get a single Incident Header by ID
router.get('/:id', getIncidentHeaderById);

// Update an Incident Header by ID
router.put('/:id', updateIncidentHeader);

// Delete an Incident Header by ID
router.delete('/:id', deleteIncidentHeader);

export default router;