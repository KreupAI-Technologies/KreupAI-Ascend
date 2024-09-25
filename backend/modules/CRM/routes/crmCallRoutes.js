// routes/callRoutes.js

import express from 'express';
import {
  createCall,
  getCalls,
  getCallById,
  updateCall,
  deleteCall,
} from '../controllers/crmCallController.js';

const router = express.Router();

// Call routes
router.route('/')
  .post(createCall)    // Create a new call
  .get(getCalls);      // Get all calls

router.route('/:id')
  .get(getCallById)    // Get a call by ID
  .put(updateCall)     // Update a call
  .delete(deleteCall); // Delete a call

export default router;
