// routes/paymentBatchRoutes.js
import express from 'express';
import {
  getPaymentBatches,
  getPaymentBatchById,
  createPaymentBatch,
  updatePaymentBatch,
  deletePaymentBatch,
} from '../controllers/paymentBatchController.js';

const router = express.Router();

// GET /api/payment-batches
router.get('/', getPaymentBatches);

// GET /api/payment-batches/:id
router.get('/:id', getPaymentBatchById);

// POST /api/payment-batches
router.post('/', createPaymentBatch);

// PUT /api/payment-batches/:id
router.put('/:id', updatePaymentBatch);

// DELETE /api/payment-batches/:id
router.delete('/:id', deletePaymentBatch);

export default router;
