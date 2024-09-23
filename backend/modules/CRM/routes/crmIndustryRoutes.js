// routes/industryRoutes.js

import express from 'express';
import {
  createIndustry,
  getIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
} from '../controllers/crmIndustryController.js';


const router = express.Router();


// Industry routes
router.route('/')
  .post(createIndustry)    // Create a new industry
  .get(getIndustries);     // Get all industries

router.route('/:id')
  .get(getIndustryById)    // Get an industry by ID
  .put(updateIndustry)     // Update an industry
  .delete(deleteIndustry); // Delete an industry

export default router;
