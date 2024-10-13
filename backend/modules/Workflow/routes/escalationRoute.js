import express from 'express';
import { createEscalation, getEscalations, getEscalationById, updateEscalation, deleteEscalation } from '../controllers/escalationController.js';

const router = express.Router();

router.post('/escalations', createEscalation);
router.get('/escalations', getEscalations);
router.get('/escalations/:id', getEscalationById);
router.put('/escalations/:id', updateEscalation);
router.delete('/escalations/:id', deleteEscalation);

export default router;