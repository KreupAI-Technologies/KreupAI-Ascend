//Khushi
//24-09-24

import express from 'express';
import { createIntegration, getIntegrations, getIntegrationById, updateIntegration, deleteIntegration } from '../controllers/integrationController.js';

const router = express.Router();

router.post('/', createIntegration);
router.get('/', getIntegrations);
router.get('/:id', getIntegrationById);
router.put('/:id', updateIntegration);
router.delete('/:id', deleteIntegration);

export default router;