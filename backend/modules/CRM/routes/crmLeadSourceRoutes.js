

import express from 'express';
import {
  createLeadSource,
  getLeadSources,
  getLeadSourceById,
  updateLeadSource,
  deleteLeadSource,
} from '../controllers/crmLeadSourceController.js';

const router = express.Router();

// LeadSource routes
router.route('/')
  .post(createLeadSource)    // Create a new lead source
  .get(getLeadSources);      // Get all lead sources

router.route('/:id')
  .get(getLeadSourceById)    // Get a lead source by ID
  .put(updateLeadSource)     // Update a lead source
  .delete(deleteLeadSource); // Delete a lead source

export default router;
