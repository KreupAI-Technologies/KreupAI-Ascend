// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0

import express from 'express';
import {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
} from '../controllers/crmStateController.js';


const router = express.Router();

router.route('/')
  .post(createState)    // Create a new state
  .get(getStates);      // Get all states

router.route('/:id')
  .get(getStateById)    // Get a state by ID
  .put(updateState)     // Update a state
  .delete(deleteState); // Delete a state

export default router;
