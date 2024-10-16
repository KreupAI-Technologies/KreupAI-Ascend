// routes/generalLedgerRoutes.js
import express from 'express';
import { getAllEntries, createEntry, getEntryById, updateEntry, deleteEntry } from '../controllers/generalLedgerController.js';

const router = express.Router();

router.route('/generalLedger')
  .post(createEntry)
  .get(getAllEntries);

router.route('/generalLedger/:id')
  .get(getEntryById)
  .put(updateEntry)
  .delete(deleteEntry);

export default router;
