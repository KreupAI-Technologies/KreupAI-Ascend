// routes/transactionTypesRoutes.js
import express from 'express';
import { getTransactionTypes, createTransactionType } from '../controllers/transactionTypesController.js';

const router = express.Router();

router.post('/transactionTypes', createTransactionType);
router.get('/transactionTypes', getTransactionTypes);

export default router;
