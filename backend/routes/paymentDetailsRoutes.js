// routes/paymentDetailsRoutes.js
import express from 'express';
import {
  createPaymentDetails,
  getAllPaymentDetails,
  getPaymentDetailsById,
  updatePaymentDetails,
  deletePaymentDetails,
} from '../controllers/paymentDetailsController.js';

const router = express.Router();

// Routes
router.post('/', createPaymentDetails);
router.get('/', getAllPaymentDetails);
router.get('/:id', getPaymentDetailsById);
router.put('/:id', updatePaymentDetails);
router.delete('/:id', deletePaymentDetails);

export default router;
