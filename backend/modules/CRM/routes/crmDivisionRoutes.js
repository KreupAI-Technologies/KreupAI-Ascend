import express from 'express';
import {
  createDivision,
  getDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
} from '../controllers/crmDivisionController.js';

const router = express.Router();

// Division routes
router.route('/')
  .post(createDivision)    // Create a new division
  .get(getDivisions);      // Get all divisions

router.route('/:id')
  .get(getDivisionById)    // Get a division by ID
  .put(updateDivision)     // Update a division
  .delete(deleteDivision); // Delete a division

export default router;