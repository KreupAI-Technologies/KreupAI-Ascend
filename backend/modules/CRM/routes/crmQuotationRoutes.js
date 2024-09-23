// routes/quotationRoutes.js

import express from 'express';
import {
  createQuotation,
  getQuotations,
  getQuotationById,
  updateQuotation,
  deleteQuotation,
} from '../controllers/crmQuotationController.js';

const router = express.Router();

// Quotation routes
router.route('/')
  .post(createQuotation)    // Create a new quotation
  .get(getQuotations);      // Get all quotations

router.route('/:id')
  .get(getQuotationById)    // Get a quotation by ID
  .put(updateQuotation)     // Update a quotation
  .delete(deleteQuotation); // Delete a quotation

export default router;
