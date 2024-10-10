import express from 'express';
import { createSLA, getSLAs, updateSLA, deleteSLA } from '../controllers/slaController.js';

const router = express.Router();

router.post('/sla', createSLA);
router.get('/sla', getSLAs);
router.put('/sla/:id', updateSLA);
router.delete('/sla/:id', deleteSLA);

export default router;