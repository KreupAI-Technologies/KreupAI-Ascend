// /routes/bpMethodRoutes.js

import express from 'express';
import { getBPMethods, createBPMethod } from '../controllers/bpMethodController.js';

const router = express.Router();

// Route to get all BPMethods
router.get('/', getBPMethods);

// Route to create a new BPMethod
router.post('/', createBPMethod);

export default router;
