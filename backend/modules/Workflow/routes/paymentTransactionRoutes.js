import express from 'express';
import {
    createPaymentTransaction,
    getAllPaymentTransactions,
    getPaymentTransactionById,
    updatePaymentTransaction,
    deletePaymentTransaction
} from '../controllers/paymentTransactionController.js';

const router = express.Router();

// Create a new PaymentTransaction
router.post('/', createPaymentTransaction);

// Get all PaymentTransactions
router.get('/', getAllPaymentTransactions);

// Get a PaymentTransaction by ID
router.get('/:id', getPaymentTransactionById);

// Update a PaymentTransaction
router.put('/:id', updatePaymentTransaction);

// Delete a PaymentTransaction
router.delete('/:id', deletePaymentTransaction);

export default router;
