// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0
import express from 'express';
import {
  createPaymentTerm,
  getPaymentTerms,
  getPaymentTermById,
  updatePaymentTerm,
  deletePaymentTerm,
} from '../controllers/crmPaymentTermController.js';

const router = express.Router();

// PaymentTerm routes
router.route('/')
  .post(createPaymentTerm)    // Create a new payment term
  .get(getPaymentTerms);     // Get all payment terms

router.route('/:id')
  .get(getPaymentTermById)    // Get a payment term by ID
  .put(updatePaymentTerm)     // Update a payment term
  .delete(deletePaymentTerm); // Delete a payment term

export default router;