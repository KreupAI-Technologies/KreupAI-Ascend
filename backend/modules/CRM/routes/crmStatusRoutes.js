// routes/statusRoutes.js

import express from 'express';
import {
  createStatus,
  getStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
} from '../controllers/crmStatusController.js';

const router = express.Router();

// Status routes
router.route('/')
  .post(createStatus)    // Create a new status
  .get(getStatuses);     // Get all statuses

router.route('/:id')
  .get(getStatusById)    // Get a status by ID
  .put(updateStatus)     // Update a status
  .delete(deleteStatus); // Delete a status

export default router;
