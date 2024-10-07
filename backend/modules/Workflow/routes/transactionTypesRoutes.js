// routes/transactionTypesRoutes.js
import express from 'express';
import { getTransactionTypes, createTransactionType } from '../controllers/transactionTypesController.js';

const router = express.Router();

router.get('/', getTransactionTypes);
router.post('/', createTransactionType);

export default router;
