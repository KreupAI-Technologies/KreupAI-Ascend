// routes/deliveryTermRoutes.js

import express from 'express';
import {
  createDeliveryTerm,
  getDeliveryTerms,
  getDeliveryTermById,
  updateDeliveryTerm,
  deleteDeliveryTerm,
} from '../controllers/crmDeliveryTermController.js';

const router = express.Router();

// DeliveryTerm routes
router.route('/')
  .post(createDeliveryTerm)    // Create a new delivery term
  .get(getDeliveryTerms);      // Get all delivery terms

router.route('/:id')
  .get(getDeliveryTermById)    // Get a delivery term by ID
  .put(updateDeliveryTerm)     // Update a delivery term
  .delete(deleteDeliveryTerm); // Delete a delivery term

export default router;
