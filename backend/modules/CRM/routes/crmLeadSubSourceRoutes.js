// routes/leadSubSourceRoutes.js

import express from 'express';
import {
  createLeadSubSource,
  getLeadSubSources,
  getLeadSubSourceById,
  updateLeadSubSource,
  deleteLeadSubSource,
} from '../controllers/crmLeadSubSourceController.js';

const router = express.Router();

// LeadSubSource routes
router.route('/')
  .post(createLeadSubSource)    // Create a new lead sub source
  .get(getLeadSubSources);      // Get all lead sub sources

router.route('/:id')
  .get(getLeadSubSourceById)    // Get a lead sub source by ID
  .put(updateLeadSubSource)     // Update a lead sub source
  .delete(deleteLeadSubSource); // Delete a lead sub source

export default router;
