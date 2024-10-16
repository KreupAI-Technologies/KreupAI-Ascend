import express from 'express';
import {
  createLedgerSummary,
  getLedgerSummaries,
  getLedgerSummaryById,
  updateLedgerSummary,
  deleteLedgerSummary,
} from '../controllers/ledgerSummaryController.js';

const router = express.Router();

// Route to create a new Ledger Summary
router.post('/ledgerSummary', createLedgerSummary);

// Route to get all Ledger Summaries
router.get('/ledgerSummary', getLedgerSummaries);

// Route to get a specific Ledger Summary by ID
router.get('/ledgerSummary/:id', getLedgerSummaryById);

// Route to update a Ledger Summary by ID
router.put('/ledgerSummary/:id', updateLedgerSummary);

// Route to delete a Ledger Summary by ID
router.delete('/ledgerSummary/:id', deleteLedgerSummary);

export default router;
