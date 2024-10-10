// routes/transactionTypesRoutes.js
import express from 'express';
import { getTransactionTypes, createTransactionType } from '../controllers/transactionTypesController.js';

const router = express.Router();

router.post('/', createTransactionType);
router.get('/', getTransactionTypes);

export default router;
