// routes/quotationLineRoutes.js

import express from 'express';
import {
  createQuotationLine,
  getQuotationLines,
  getQuotationLineById,
  updateQuotationLine,
  deleteQuotationLine,
} from '../controllers/crmQuotationLineController.js';

const router = express.Router();

// QuotationLine routes
router.route('/')
  .post(createQuotationLine)    // Create a new quotation line
  .get(getQuotationLines);      // Get all quotation lines

router.route('/:id')
  .get(getQuotationLineById)    // Get a quotation line by ID
  .put(updateQuotationLine)     // Update a quotation line
  .delete(deleteQuotationLine); // Delete a quotation line

export default router;
