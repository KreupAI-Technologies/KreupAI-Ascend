import express from 'express';
import { createIncident, getIncidents, getIncidentById, updateIncident, deleteIncident } from '../controllers/incidentController.js';

const router = express.Router();

router.post('/incidents', createIncident);
router.get('/incidents', getIncidents);
router.get('/incidents/:id', getIncidentById);
router.put('/incidents/:id', updateIncident);
router.delete('/incidents/:id', deleteIncident);

export default router;