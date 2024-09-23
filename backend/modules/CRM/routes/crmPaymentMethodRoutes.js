// routes/paymentMethodRoutes.js

import express from 'express';
import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} from '../controllers/crmPaymentMethodController.js';

const router = express.Router();

// PaymentMethod routes
router.route('/')
  .post(createPaymentMethod)    // Create a new payment method
  .get(getPaymentMethods);      // Get all payment methods

router.route('/:id')
  .get(getPaymentMethodById)    // Get a payment method by ID
  .put(updatePaymentMethod)     // Update a payment method
  .delete(deletePaymentMethod); // Delete a payment method

export default router;
