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
router.post('/', createLedgerSummary);

// Route to get all Ledger Summaries
router.get('/', getLedgerSummaries);

// Route to get a specific Ledger Summary by ID
router.get('/:id', getLedgerSummaryById);

// Route to update a Ledger Summary by ID
router.put('/:id', updateLedgerSummary);

// Route to delete a Ledger Summary by ID
router.delete('/:id', deleteLedgerSummary);

export default router;
