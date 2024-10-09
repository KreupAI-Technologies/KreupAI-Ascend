import express from 'express';
import {
  createIntegration,
  getIntegrations,
  getIntegrationById,
  updateIntegration,
  deleteIntegration,
} from '../controllers/integrationController.js';

const router = express.Router();

// Create a new integration process
router.post('/integration', createIntegration);

// Get all integration processes
router.get('/integration', getIntegrations);

// Get a single integration process by ID
router.get('/integration/:id', getIntegrationById);

// Update an integration process by ID
router.put('/integration/:id', updateIntegration);

// Delete an integration process by ID
router.delete('/integration/:id', deleteIntegration);

export default router;
