// /routes/chequeMasterRoutes.js
import express from 'express';
import { getChequeMasters, createChequeMaster } from '../controllers/chequeMasterController.js';

const router = express.Router();

// Get all ChequeMaster records
router.get('/', getChequeMasters);

// Create a new ChequeMaster
router.post('/', createChequeMaster);

export default router;
