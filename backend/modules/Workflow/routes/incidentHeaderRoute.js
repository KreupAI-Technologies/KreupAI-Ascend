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
router.post('/IncidentHeader', createIncidentHeader);

// Get all Incident Headers
router.get('/IncidentHeader', getAllIncidentHeaders);

// Get a single Incident Header by ID
router.get('/IncidentHeader/:id', getIncidentHeaderById);

// Update an Incident Header by ID
router.put('/IncidentHeader/:id', updateIncidentHeader);

// Delete an Incident Header by ID
router.delete('/IncidentHeader/:id', deleteIncidentHeader);

export default router;